export * as vue from 'vue'

// declare module "*.vue" {
//   import { DefineComponent, ComponentCustomProperties } from "vue";
//   const component: DefineComponent<{}, {}, any>;
//   export interface ComponentCustomProperties {
//     $http: string
//     $validate: (data: object, rule: object) => boolean;
//   }
//   export default component;
// }

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: string
    $validate: (data: object, rule: object) => boolean
  }
}
