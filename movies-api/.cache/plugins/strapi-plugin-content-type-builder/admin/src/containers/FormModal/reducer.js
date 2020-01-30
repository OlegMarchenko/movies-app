import { fromJS } from 'immutable';
import pluralize from 'pluralize';
import { snakeCase } from 'lodash';
import makeUnique from '../../utils/makeUnique';
import { createComponentUid } from './utils/createUid';
import {
  shouldPluralizeName,
  shouldPluralizeTargetAttribute,
} from './utils/relations';

const initialState = fromJS({
  formErrors: {},
  modifiedData: {},
  initialData: {},
  componentToCreate: {},
  isCreatingComponentWhileAddingAField: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS_TO_DYNAMIC_ZONE': {
      const { name, components, shouldAddComponents } = action;

      return state.updateIn(['modifiedData', name], list => {
        if (shouldAddComponents) {
          return makeUnique(list.concat(components));
        } else {
          return makeUnique(
            list.filter(comp => {
              return components.indexOf(comp) === -1;
            })
          );
        }
      });
    }
    case 'ON_CHANGE':
      return state.update('modifiedData', obj => {
        const {
          selectedContentTypeFriendlyName,
          keys,
          value,
          oneThatIsCreatingARelationWithAnother,
        } = action;

        if (keys.length === 1 && keys.includes('nature')) {
          return obj
            .update('nature', () => value)
            .update('dominant', () => {
              if (value === 'manyToMany') {
                return true;
              }

              return null;
            })
            .update('name', oldValue => {
              return pluralize(snakeCase(oldValue), shouldPluralizeName(value));
            })
            .update('targetAttribute', oldValue => {
              if (['oneWay', 'manyWay'].includes(value)) {
                return '-';
              }

              return pluralize(
                oldValue === '-'
                  ? snakeCase(oneThatIsCreatingARelationWithAnother)
                  : oldValue,
                shouldPluralizeTargetAttribute(value)
              );
            })
            .update('targetColumnName', oldValue => {
              if (['oneWay', 'manyWay'].includes(value)) {
                return null;
              }

              return oldValue;
            });
        }

        if (keys.length === 1 && keys.includes('target')) {
          return obj
            .update('target', () => value)
            .update('name', () => {
              return pluralize(
                snakeCase(selectedContentTypeFriendlyName),
                shouldPluralizeName(obj.get('nature'))
              );
            })
            .update('targetAttribute', () => {
              if (['oneWay', 'manyWay'].includes(obj.get('nature'))) {
                return '-';
              }

              return pluralize(
                snakeCase(oneThatIsCreatingARelationWithAnother),
                shouldPluralizeTargetAttribute(obj.get('nature'))
              );
            });
        }

        return obj.updateIn(keys, () => value);
      });
    case 'RESET_PROPS':
      return initialState;
    case 'RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO': {
      // This is run when the user doesn't want to create a new component
      return initialState.update('modifiedData', () =>
        fromJS({ type: 'component', repeatable: true })
      );
    }
    case 'RESET_PROPS_AND_SAVE_CURRENT_DATA': {
      // This is run when the user has created a new component
      const componentToCreate = state.getIn([
        'modifiedData',
        'componentToCreate',
      ]);
      const modifiedData = fromJS({
        name: componentToCreate.get('name'),
        type: 'component',
        repeatable: false,
        component: createComponentUid(
          componentToCreate.get('name'),
          componentToCreate.get('category')
        ),
      });

      return initialState
        .update('componentToCreate', () => componentToCreate)
        .update('modifiedData', () => modifiedData)
        .update('isCreatingComponentWhileAddingAField', () =>
          state.getIn(['modifiedData', 'createComponent'])
        );
    }
    case 'RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ': {
      const createdDZ = state.get('modifiedData');
      const dataToSet = createdDZ
        .set('createComponent', true)
        .set('componentToCreate', fromJS({ type: 'component' }));

      return initialState.update('modifiedData', () => dataToSet);
    }
    case 'SET_DATA_TO_EDIT': {
      return state
        .updateIn(['modifiedData'], () => fromJS(action.data))
        .updateIn(['initialData'], () => fromJS(action.data));
    }
    case 'SET_ATTRIBUTE_DATA_SCHEMA': {
      const {
        attributeType,
        isEditing,
        modifiedDataToSetForEditing,
        nameToSetForRelation,
        targetUid,
        step,
      } = action;

      if (isEditing) {
        return state
          .update('modifiedData', () => fromJS(modifiedDataToSetForEditing))
          .update('initialData', () => fromJS(modifiedDataToSetForEditing));
      }

      let dataToSet;

      if (attributeType === 'component') {
        if (step === '1') {
          dataToSet = {
            type: 'component',
            createComponent: true,
            componentToCreate: { type: 'component' },
          };
        } else {
          dataToSet = {
            type: 'component',
            repeatable: true,
          };
        }
      } else if (attributeType === 'dynamiczone') {
        dataToSet = {
          type: 'dynamiczone',
          components: [],
        };
      } else if (attributeType === 'text') {
        dataToSet = { type: 'string' };
      } else if (attributeType === 'number' || attributeType === 'date') {
        dataToSet = {};
      } else if (attributeType === 'media') {
        dataToSet = { type: 'media', multiple: true };
      } else if (attributeType === 'enumeration') {
        dataToSet = { type: 'enumeration', enum: [] };
      } else if (attributeType === 'relation') {
        dataToSet = {
          name: snakeCase(nameToSetForRelation),
          nature: 'oneWay',
          targetAttribute: '-',
          target: targetUid,
          unique: false,
          dominant: null,
          columnName: null,
          targetColumnName: null,
        };
      } else {
        dataToSet = { type: attributeType, default: null };
      }

      return state.update('modifiedData', () => fromJS(dataToSet));
    }
    case 'SET_DYNAMIC_ZONE_DATA_SCHEMA': {
      return state
        .update('modifiedData', () => fromJS(action.attributeToEdit))
        .update('initialData', () => fromJS(action.attributeToEdit));
    }

    case 'SET_ERRORS':
      return state.update('formErrors', () => fromJS(action.errors));
    default:
      return state;
  }
};

export default reducer;
export { initialState };
