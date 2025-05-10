/**
 * @typedef {Object} Universe
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {string[]} allowedTagIds - Global/local tags visible in this universe
 * @property {string[]} allowedCollectionIds - Collections visible in this universe
 * @property {string[]} privateTagIds - Tags only for this universe
 * @property {string[]} privateCollectionIds - Collections only for this universe
 * @property {string[]} objectIds - Objects in this universe
 */

/**
 * @typedef {Object} BaseObject
 * @property {string} id
 * @property {string} type - 'video' | 'beatmap' | 'article' | 'note' | 'link'
 * @property {string} title
 * @property {string[]} tags - Tag IDs
 * @property {string[]} collections - Collection IDs
 * @property {string} [universeId] - Optional universe ownership
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Tag
 * @property {string} id
 * @property {string} name
 * @property {string} [color]
 * @property {string} [description]
 * @property {string} [universeId] - If tag is private to a universe
 */

/**
 * @typedef {Object} Collection
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {string} [color]
 * @property {string[]} objectIds - Objects in this collection
 * @property {string} [universeId] - If collection is private to a universe
 */

/**
 * @typedef {BaseObject & {
 *   type: 'video',
 *   videoUrl: string,
 *   thumbnailUrl?: string,
 *   durationSec?: number
 * }} VideoObject
 */

/**
 * @typedef {BaseObject & {
 *   type: 'beatmap',
 *   beatmapId: number,
 *   artist: string,
 *   creator: string,
 *   version: string,
 *   osuFilePath?: string
 * }} BeatmapObject
 */

/**
 * @typedef {BaseObject & {
 *   type: 'article',
 *   sourceUrl?: string,
 *   summary?: string,
 *   content: string,
 *   author?: string,
 *   publishedAt?: string
 * }} ArticleObject
 */

/**
 * @typedef {BaseObject & {
 *   type: 'note',
 *   content: string
 * }} NoteObject
 */

/**
 * @typedef {BaseObject & {
 *   type: 'link',
 *   url: string,
 *   description?: string,
 *   thumbnailUrl?: string
 * }} LinkObject
 */
