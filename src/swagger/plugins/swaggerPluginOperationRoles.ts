/* eslint-disable */

enum AuthStatus {
  Authorized = 'authorized',
  Anonymous = 'anonymous',
}

// Помечает метод как 'находящийся в разработке'
// Включается: @ApiExtension('x-wip', true)
// Отображает атрибут необходимости авторизации если не указан декоратор @Public()

export function swaggerPluginOperationRoles() {
  const STYLE_BY_ROLE: Record<AuthStatus, { className: string; title: string }> = {
    authorized: { className: 'opblock-role-authorized', title: 'Авторизованный' },
    anonymous: { className: 'opblock-role-anonymous', title: 'Аноним' },
  };

  return {
    wrapComponents: {
      OperationSummary: function (Original, _ref) {
        const React = _ref.React;

        return function (props) {
          const operationProps = props.operationProps;
          const isWip = operationProps.get('isWip');
          const isPublic = operationProps.get('isPublic');

          const classes = ['opblock-with-roles'];

          if (isWip) {
            classes.push('opblock-wip');
          }

          const { className, title } = isPublic ? STYLE_BY_ROLE.anonymous : STYLE_BY_ROLE.authorized;

          return React.createElement('div', { className: classes.join(' ') },
            [
              React.createElement(Original, props),
              React.createElement('div', { className: 'opblock-roles' }, [
                React.createElement('div', { className: 'opblock-role ' + className }, title),
              ]),
            ],
          );
        };
      },

      operation: function (Original, _ref) {
          const React = _ref.React;

        return function (props) {
          const operation = props.operation;
          const opPath = operation.get('path');
          const opMethod = operation.get('method');
          const operationMeta = props.specSelectors.operationWithMeta(opPath, opMethod);
          const isPublic = operationMeta.get('x-public') || false;
          const isWip = operationMeta.get('x-wip') || false;

          return React.createElement(Original, {
            ...props,
            operation: operation.set('isPublic', isPublic).set('isWip', isWip),
          });
        };
      },
    },
  };
}
