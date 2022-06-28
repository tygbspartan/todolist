import { request } from "http";
import { method } from "lodash";
import { context } from "src/plugins/kibana_react/public";

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200', auth: { username: 'elastic', password:'yokvsrWFO8RI7B2GLHah'  } })

export const getList = async (context, request, response) => {
  let result = await client.search({
    index: 'to_do_list',
  })
  result = result.body["hits"]["hits"];
  let newList = [];
  for(const todo of result){
    newList.push(todo["_source"]);
  }
  console.log(newList);
  return response.ok({"body": newList});
}

export const postList = async (context, request, response) => {
  const result = await client.create({
    id: (Math.random() * 1000).toString(),
    index: 'to_do_list',
    body: request.body
  })

  return response.ok(result);
}

export const deleteList = async (context, request, response) =>{
  const {id} = request.params;

  let finding = await client.search({
    index: "to_do_list",
    body: {
      query:{
        match:{
          id: id,
        }
      }
    }
  })
  let findingID = finding.body["hits"]["hits"][0]._id

  await client.delete({
    index: "to_do_list",
    id: findingID
  })

  return response.ok("Deleted Successfully")
}
