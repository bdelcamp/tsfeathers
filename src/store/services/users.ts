import client, { makeServicePlugin, BaseModel } from '@/lib/client';

class User extends BaseModel {
  constructor(data: any , options: any) {
    super(data, options)
  }

  static modelName = 'User';
  static instanceDefaults() {
    return {
      email: '',
      password: ''
    }
  }

}
const servicePath = 'users';
const servicePlugin = makeServicePlugin({
  Model: User,
  service: client.service(servicePath),
  servicePath
});