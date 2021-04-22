import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)
Builder.isStatic = true

export async function resolveBuilderContent(
  modelName,
  targetingAttributes,
  cachebust
) {
  let page = await builder
    .get(modelName, {
      userAttributes: targetingAttributes,
      ...(cachebust
        ? {
          cachebust: true,
          noCache: true,
        }
        : {
          staleCacheSeconds: 140,
        }),
    })
    .toPromise()

  return page || null
}
