import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamoDb";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  const result = await dynamoDb.get(params);

  if(!result.Item) {
    throw new Error("Item not Found");
  }

  return result.Item;
});