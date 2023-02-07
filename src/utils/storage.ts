import { Profile } from '@/types/user'
const PROFILE_KEY = 'rabbit-profile-92'
// 封装和localstorage相关的api

/**
 * 本地持久化-保存
 */
export function setProfile(profile: Profile): void {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

/**
 * 本地持久化-读取
 */
export function getProfile(): Profile {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
}

/**
 * 本地持久化-删除
 */
export function removeProfile(): void {
    localStorage.removeItem(PROFILE_KEY)
}
