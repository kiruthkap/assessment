import { Animated } from "react-native";

export interface Video {
    id: number;
    url: string;
    createdAt: string;
    thumb: string;
    title: string;
    key: number;
    tab: number;
}

export interface VideoListProps {
    tabKey: string;
}

export interface VideoItemProps {
    item: Video;
    isVisible: boolean;
}

export interface VideoState {
    videos: Video[];
    loading: boolean;
    error: string | null;
    page: number;
}

export interface ApiParam {
    page: number;
    tab: number;
}

export interface HeaderProps {
    headerTranslate: Animated.AnimatedInterpolation<number>;
}