import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { Roles } from 'src/enums/Roles';

export function resolveUserRole(role: Roles | { name: Roles }): Roles {
    return typeof role === 'string' ? role : role.name;
}

export function resolveUserRoles(
    roles:
        | Roles[]
        | { name: string }[]
        | Roles
        | { name: string }
        | undefined,
): Roles[] {
    if (!roles) return [];
    if (Array.isArray(roles)) {
        return roles.map((r) =>
            typeof r === 'string' ? (r as Roles) : (r.name as Roles),
        );
    }
    return [
        typeof roles === 'string' ? roles : (roles.name as Roles),
    ];
}

export function hasAnyRole(userRoles: Roles[], allowed: Roles[]): boolean {
    return userRoles.some((r) => allowed.includes(r));
}

export interface PaginationOptions {
    page: number;
    limit: number;
}

export interface QueryOptions extends PaginationOptions {
    sort?: Array<[string, 'ASC' | 'DESC']>;
    filter?: Record<string, any>;
    noPagination?: boolean;
}

export const PaginationHelper = createParamDecorator(
    (
        defaults: Partial<PaginationOptions> = { page: 1, limit: 10 },
        ctx: ExecutionContext,
    ): QueryOptions => {
        const req = ctx.switchToHttp().getRequest();
        const q = req.query as Record<string, any>;
        const { sort, filter } = q;

        const hasPage = Object.prototype.hasOwnProperty.call(q, 'page');
        const hasLimit = Object.prototype.hasOwnProperty.call(q, 'limit');

        // Detecta explicitamente paginate=false, ou ausência de page/limit
        let noPagination = !hasPage && !hasLimit;
        const paginateParam = q.paginate;
        if (typeof paginateParam === 'string') {
            const v = paginateParam.toLowerCase();
            if (['0', 'false', 'no'].includes(v)) noPagination = true;
            if (['1', 'true', 'yes'].includes(v)) noPagination = false;
        }

        let p = Number(q.page ?? defaults.page ?? 1);
        let l = Number(q.limit ?? defaults.limit ?? 10);

        if (!Number.isFinite(p) || p < 1) p = defaults.page ?? 1;
        if (!Number.isFinite(l) || l < 1) l = defaults.limit ?? 10;
        if (l > 100) l = 100;

        let sortPairs: Array<[string, 'ASC' | 'DESC']> | undefined;
        if (typeof sort === 'string' && sort.length) {
            sortPairs = sort.split(',').map((s: string) => {
                const [fieldRaw, dirRaw] = s.split(':');
                const field = String(fieldRaw).trim();
                const dir =
                    String(dirRaw ?? 'asc').toUpperCase() === 'DESC'
                        ? 'DESC'
                        : 'ASC';
                return [field, dir] as [string, 'ASC' | 'DESC'];
            });
        }

        let filterObj: Record<string, any> | undefined;
        if (typeof filter === 'string' && filter.length) {
            try {
                filterObj = JSON.parse(filter);
            } catch {
                filterObj = undefined;
            }
        }

        return {
            page: p,
            limit: l,
            sort: sortPairs,
            filter: filterObj,
            noPagination,
        };
    },
);

export function applyQueryOptions<T>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    opts: {
        sort?: Array<[string, 'ASC' | 'DESC']>;
        filter?: Record<string, any>;
    },
) {
    const { sort, filter } = opts;

    if (sort?.length) {
        const [first, ...rest] = sort;
        qb.orderBy(`${alias}.${first[0]}`, first[1]);
        for (const [field, order] of rest) {
            qb.addOrderBy(`${alias}.${field}`, order);
        }
    }

    if (filter && Object.keys(filter).length) {
        for (const key of Object.keys(filter)) {
            const value = filter[key];
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) continue;

            if (typeof value === 'string') {
                qb.andWhere(`${alias}.${key} ILIKE :${key}`, {
                    [key]: `%${value}%`,
                });
            } else if (Array.isArray(value)) {
                qb.andWhere(`${alias}.${key} IN (:...${key})`, {
                    [key]: value,
                });
            } else {
                qb.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
            }
        }
    }

    return qb;
}
