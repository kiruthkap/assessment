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

export interface TabViewProps {
    scrollY: Animated.Value;
}

export interface VideoListProps {
    tabKey: string;
    scrollY: Animated.Value;
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
    refreshing: boolean;
}

export interface ApiParam {
    page: number;
    tab: number;
}

export interface HeaderProps {
    scrollY: Animated.Value;
}