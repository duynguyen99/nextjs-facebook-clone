import React, { ButtonHTMLAttributes, InputHTMLAttributes } from "react"
import { User } from "./User"

export type LayoutProps = {
    children: React.ReactNode,
}

export type RecentUserProps = {
    users: User[],
    setSelectedUser?: (user: User) => void;
}

export type ModalProps = {
    hideTitle?: boolean,
    children?: React.ReactNode,
    title?: string
    descriptionTitle?: string,
    onClose?: () => void;
}

export type ModalLoginProps = { 
    user: User,
    onLogin: () => void;
}

export type ModalRegisterProps = {
    onRegister: () => void;
}

export type UserAvatarProps = {
    data: User,
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
}

export type LoginPageProps = {
    users: User[],
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    errorText?: string,
    registerForm?: any,
}