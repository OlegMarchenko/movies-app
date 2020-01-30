import React, { useReducer } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { get, take } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { ErrorMessage } from '@buffetjs/styles';
import pluginId from '../../pluginId';
import useDataManager from '../../hooks/useDataManager';
import ItemTypes from '../../utils/ItemTypes';
import Button from './AddFieldButton';
import DraggedItem from './DraggedItem';
import EmptyComponent from './EmptyComponent';
import init from './init';
import reducer, { initialState } from './reducer';

const RepeatableComponent = ({
  componentUid,
  componentValue,
  componentValueLength,
  fields,
  isNested,
  max,
  min,
  name,
  schema,
}) => {
  const { addRepeatableComponentToField, formErrors } = useDataManager();
  const [, drop] = useDrop({ accept: ItemTypes.COMPONENT });

  const componentErrorKeys = Object.keys(formErrors)
    .filter(errorKey => {
      return take(errorKey.split('.'), isNested ? 3 : 1).join('.') === name;
    })
    .map(errorKey => {
      return errorKey
        .split('.')
        .slice(0, name.split('.').length + 1)
        .join('.');
    });

  // We need to synchronize the collapses array with the data
  // The key needed for react in the list will be the one from the collapses data
  // This way we don't have to mutate the data when it is received and we can use a unique key
  const [state, dispatch] = useReducer(reducer, initialState, () =>
    init(initialState, componentValue)
  );
  const { collapses } = state.toJS();
  const toggleCollapses = index => {
    dispatch({
      type: 'TOGGLE_COLLAPSE',
      index,
    });
  };
  const missingComponentsValue = min - componentValueLength;
  const errorsArray = componentErrorKeys.map(key =>
    get(formErrors, [key, 'id'], '')
  );

  const hasMinError =
    get(errorsArray, [0], '').includes('min') &&
    !collapses.some(obj => obj.isOpen === true);

  return (
    <div>
      {componentValueLength === 0 && (
        <EmptyComponent hasMinError={hasMinError}>
          <FormattedMessage id={`${pluginId}.components.empty-repeatable`}>
            {msg => <p>{msg}</p>}
          </FormattedMessage>
        </EmptyComponent>
      )}
      <div ref={drop}>
        {componentValueLength > 0 &&
          componentValue.map((data, index) => {
            const componentFieldName = `${name}.${index}`;
            const doesPreviousFieldContainErrorsAndIsOpen =
              componentErrorKeys.includes(`${name}.${index - 1}`) &&
              index !== 0 &&
              get(collapses, [index - 1, 'isOpen'], false) === false;
            const hasErrors = componentErrorKeys.includes(componentFieldName);

            return (
              <DraggedItem
                fields={fields}
                componentFieldName={componentFieldName}
                doesPreviousFieldContainErrorsAndIsOpen={
                  doesPreviousFieldContainErrorsAndIsOpen
                }
                hasErrors={hasErrors}
                hasMinError={hasMinError}
                isFirst={index === 0}
                isOpen={get(collapses, [index, 'isOpen'], false)}
                key={get(collapses, [index, '_temp__id'], null)}
                onClickToggle={() => {
                  // Close all other collapses and open the selected one
                  toggleCollapses(index);
                }}
                removeCollapse={() => {
                  dispatch({
                    type: 'REMOVE_COLLAPSE',
                    index,
                  });
                }}
                moveCollapse={(dragIndex, hoverIndex) => {
                  dispatch({
                    type: 'MOVE_COLLAPSE',
                    dragIndex,
                    hoverIndex,
                  });
                }}
                parentName={name}
                schema={schema}
                toggleCollapses={toggleCollapses}
              />
            );
          })}
      </div>
      <Button
        hasMinError={hasMinError}
        withBorderRadius={false}
        doesPreviousFieldContainErrorsAndIsClosed={
          componentValueLength > 0 &&
          componentErrorKeys.includes(`${name}.${componentValueLength - 1}`) &&
          collapses[componentValueLength - 1].isOpen === false
        }
        type="button"
        onClick={() => {
          if (componentValueLength < max) {
            const shouldCheckErrors = hasMinError;

            addRepeatableComponentToField(
              name,
              componentUid,
              shouldCheckErrors
            );
            dispatch({
              type: 'ADD_NEW_FIELD',
            });
          } else if (componentValueLength >= max) {
            strapi.notification.info(
              `${pluginId}.components.notification.info.maximum-requirement`
            );
          }
        }}
      >
        <i className="fa fa-plus" />
        <FormattedMessage id={`${pluginId}.containers.EditView.add.new`} />
      </Button>
      {hasMinError && (
        <ErrorMessage>
          <FormattedMessage
            id={`${pluginId}.components.DynamicZone.missing${
              missingComponentsValue > 1 ? '.plural' : '.singular'
            }`}
            values={{ count: missingComponentsValue }}
          />
        </ErrorMessage>
      )}
    </div>
  );
};

RepeatableComponent.defaultProps = {
  componentValue: null,
  componentValueLength: 0,
  fields: [],
  isNested: false,
  max: Infinity,
  min: -Infinity,
};

RepeatableComponent.propTypes = {
  componentUid: PropTypes.string.isRequired,
  componentValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  componentValueLength: PropTypes.number,
  fields: PropTypes.array,
  isNested: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
};

export default RepeatableComponent;
