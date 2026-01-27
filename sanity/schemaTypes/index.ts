import {albumType} from './albumType'
import {songObjectType} from './songObjectType'
import {showType} from './showType'
import {bandMemberType} from './bandMemberType'
import {merchItemType} from './merchItemType'
import {pressItemType} from './pressItemType'
import {siteSettingsType} from './siteSettingsType'
import { SchemaTypeDefinition } from 'sanity'

export const schema = {
    types: [
        siteSettingsType,
        albumType,
        showType,
        bandMemberType,
        merchItemType,
        pressItemType,
        songObjectType,
    ] satisfies SchemaTypeDefinition[],
}
