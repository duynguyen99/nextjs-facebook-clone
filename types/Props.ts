import React, { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { DropdownItem, FormLogin, Post, User } from "./Base";

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
  user?: User;
  onLogin: (data: FormLogin) => void;
  loading?: boolean;
  isErrorInCorrectPasswordModal?: boolean;
};

export type ModalAddNewPostProps = {
  onSubmit: (data: Post, callback: () => void) => void;
  onCloseModal: () => void;
  userData: User;
};

export type ModalRegisterProps = {
  onRegister: (data: User, callback?: (msg: string) => void) => void;
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
  buttonType?: "primary" | "secondary";
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
  onAdd: (data: Post, callback: (msg?: string) => void) => void;
};

export type PostProps = {
  posts: Post[];
  isLoading?: boolean;
};

export type SpinProps = {
  className?: string;
};

export type UserProfilePageProps = {
  user: User;
  posts: Post[],
}

export enum ToggleType {
  GRAPHQL,
  RESTFUL
}

export type ToggleProps = {
  type: ToggleType
  onToggle: (type: ToggleType) => void
}