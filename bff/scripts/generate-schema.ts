import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { schema } from '../src/schema.js';

const schemaSDL = printSchema(schema);

writeFileSync('graphql/schema.graphql', schemaSDL);

console.log('✅ GraphQLスキーマファイルが生成されました: graphql/schema.graphql'); 
