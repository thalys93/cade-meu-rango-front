import { useState, useState } from "react";

export interface newUserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isAdmin: boolean;
    isAuthor: boolean;
}

export function RegisterUtils() {}