import React, { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { DropdownItem, Post, User } from "./Base";

export type Metadata = {
  user?: User;
};

export type LayoutProps = {
  children: React.ReactNode;
  metadata?: Metadata;
  className?: string;
};

export type RecentUserProps = {
  users: User[];
  setSelectedUser?: (user: User) => void;
};

export type ModalProps = {
  hideTitle?: boolean;
  children?: React.ReactNode;
  title?: string;
  descriptionTitle?: string;
  titleClassName?: string;
  onClose?: () => void;
};

export type ModalLoginProps = {
  user: User;
  onLogin: (password: string) => void;
  loading?: boolean;
};

export type ModalAddNewPostProps = {
  onSubmit: (data: Post, callback: () => void) => void;
  onCloseModal: () => void;
};

export type ModalRegisterProps = {
  onRegister: (data: User) => void;
  loading?: boolean;
};

export type UserAvatarProps = {
  data: User;
  className?: string;
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
  loading?: boolean;
}

export type LoginPageProps = {
  users: User[];
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  registerForm?: any;
}

export type MainNavigationProps = {
  user?: User;
};

export type AvatarDropdownProps = {
  avatar: string;
  dropdownData: DropdownItem[];
};

export type DropdownProps = {
  data: DropdownItem[];
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NewPostProps = {
  onAdd: (data: Post, callback: () => void) => void;
};

export type PostProps = {
  posts: Post[],
};
