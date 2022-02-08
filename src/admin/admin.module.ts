import * as AdminJSMongoose from '@adminjs/mongoose';
import { Module } from '@nestjs/common';
import AdminJs from 'adminjs';
import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import { PostsModule } from '../posts/posts.module';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from '../posts/posts.schema';
import { Model } from 'mongoose';

AdminJs.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    AdminJSModule.createAdminAsync({
      imports: [PostsModule],
      inject: [getModelToken(Post.name)],
      useFactory: (postModel: Model<Post>) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: postModel,
              options: {
                properties: {
                  contents: { type: 'richtext' },
                },
              },
            },
          ],
          dashboard: {
            component: AdminJs.bundle('./dashboard'),
          },
          branding: {
            companyName: 'ADMIN',
            logo: false,
          },
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'test' }),
          cookieName: 'pinple',
          cookiePassword: 'pinple',
        },
      }),
    }),
  ],
})
export class AdminModule {}
