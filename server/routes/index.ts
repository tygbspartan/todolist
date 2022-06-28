
import { IRouter } from '../../../../src/core/server';
import { schema } from '@kbn/config-schema';
import { deleteList, getList, postList } from '../controller/index';


export function defineRoutes(router: IRouter) {
  
  const validate = {
    body: schema.object({
      id: schema.number(),
      text: schema.string(),
      desc: schema.string(),
    }),
  };

  // const validated = {
  //   params: schema.object({
  //     id: schema.number(),
  //   }),
  // };

  // GET ALL NOTES FROM TO DO LIST
  router.get(
    {
      path: '/api/to_do_lists',
      validate: false,
    },
    getList
  );

  // CREATE A NEW NOTE
  router.post(
    {
      path: '/api/to_do_lists',
      validate,
    },
    postList
  );

  // DELETE A NOTE
  router.delete(
    {
      path: '/api/to_do_list/{id}',
      validate:{
        params: schema.object({
          id: schema.number(),
        }),
      },
    },
    deleteList
  );
}
