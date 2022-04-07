export type ThumbUrlType = {
    large: string;
    middle: string;
    small: string;
}

export type FilesType = {
    id: number;
    userId: number;
    url: string;
    thumbUrls: ThumbUrlType;
    createdAt: string;
    updatedAt: string;
}

export type UsersType = {
    id: number;
    email: string;
    username: string;
    avatarFileId: number;
    coverFileId: number;
    intro: string;
    createdAt: string;
    updatedAt: string;
    avatarFile: FilesType;
    coverFile: FilesType;
}

export type TasksType = {
    id: number;
    userId: number;
    title: string;
    desc: string;
    coverFileId: number;
    payAmount: number;
    startAt: string;
    stopAt: string;
    text: string;
    link: string;
    credentials: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: UsersType;
    coverFile: FilesType;
}
