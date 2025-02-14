import { createEntity, batchListThroughGetTo, storeLoadById } from '../database/middleware';
import { listEntities } from '../database/middleware-loader';
import { BUS_TOPICS } from '../config/conf';
import { notify } from '../database/redis';
import { ENTITY_TYPE_ATTACK_PATTERN, ENTITY_TYPE_COURSE_OF_ACTION } from '../schema/stixDomainObject';
import { ABSTRACT_STIX_DOMAIN_OBJECT } from '../schema/general';
import { RELATION_MITIGATES } from '../schema/stixCoreRelationship';

export const findById = (context, user, courseOfActionId) => {
  return storeLoadById(context, user, courseOfActionId, ENTITY_TYPE_COURSE_OF_ACTION);
};

export const findAll = (context, user, args) => {
  return listEntities(context, user, [ENTITY_TYPE_COURSE_OF_ACTION], args);
};

export const addCourseOfAction = async (context, user, courseOfAction) => {
  const created = await createEntity(context, user, courseOfAction, ENTITY_TYPE_COURSE_OF_ACTION);
  return notify(BUS_TOPICS[ABSTRACT_STIX_DOMAIN_OBJECT].ADDED_TOPIC, created, user);
};

export const batchAttackPatterns = async (context, user, courseOfActionIds) => {
  return batchListThroughGetTo(context, user, courseOfActionIds, RELATION_MITIGATES, ENTITY_TYPE_ATTACK_PATTERN);
};
