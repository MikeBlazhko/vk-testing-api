export const swaggerPluginOperationRolesStyles = `
.swagger-ui .opblock-wip .opblock-summary {
  opacity: .5;
}
.swagger-ui .opblock-wip .opblock.opblock {
  border-style: dashed;
}
.swagger-ui .opblock-wip .opblock-summary-path::before {
  content: "🚧 ";
}
.swagger-ui .opblock-with-roles {
  position: relative;
}
.swagger-ui .opblock-roles {
  position: absolute;
  display: flex;
  right: 30px;
  top: 10px;
}
.swagger-ui .opblock-role {
  color: white;
  background: #ff5722;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 12px;
}
.swagger-ui .opblock-role + .opblock-role {
  margin-left: 8px;
}
.swagger-ui .opblock-role.opblock-role-anonymous {
  background-color: #dc3545;
}
.swagger-ui .opblock-role.opblock-role-unknown {
  background-color: #6c757d;
}
.swagger-ui .opblock-role.opblock-role-authorized {
  background-color: #0dcaf0;
  color: #075362;
}
`;
