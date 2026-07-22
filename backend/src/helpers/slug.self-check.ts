import { toCategorySlug } from './slug';

function assert(condition: boolean, message: string) {
    if (!condition) throw new Error(message);
}

assert(toCategorySlug('Doces') === 'doces', 'lowercase');
assert(toCategorySlug('  DOCÊS ') === 'doces', 'trim + accent');
assert(toCategorySlug('Salgados / Forno') === 'salgados-forno', 'symbols');
assert(toCategorySlug('Doce') === 'doce', 'singular stays distinct');

console.log('slug.self-check ok');
