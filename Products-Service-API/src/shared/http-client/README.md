## Description

Http client module for [Nest](https://github.com/nestjs/nest) based on the [axios](https://github.com/axios/axios) 
package.

## Installation

```bash
$ npm i --save axios
```

## Usage

Import `HttpClientModule`:

```typescript
@Module({
  imports: [HttpClientModule.register({ baseUrl: 'http://localhost:3000' })],
  providers: []
})
export class CatModule {}
```

Inject `HttpClientService`:

```typescript
@Injectable()
export class CatService {
  constructor(private readonly httpClientService: HttpClientService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
HttpClientModule.registerAsync({
  useFactory: () => ({
    baseUrl: 'http://localhost:3000'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
HttpClientModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    baseUrl: configService.get<string>('BASE_URL'),
  }),
  inject: [ConfigService],
})
```

**2. Use class**

```typescript
HttpClientModule.registerAsync({
  useClass: HttpClientConfigService
});
```

Above construction will instantiate `HttpClientConfigService` inside `HttpClientModule` and will leverage it to create options object.

```typescript
class HttpClientConfigService implements HttpClientModuleOptionsFactory {
  createHttpClientOptions(): HttpClientModuleOptions {
    return {
      baseUrl: 'http://localhost:3000'
    };
  }
}
```

**3. Use existing**

```typescript
HttpClientModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
})
```

It works the same as `useClass` with one critical difference - `HttpClientModule` will look up imported modules to 
reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `HttpClientService` uses [axios](https://github.com/axios/axios) underneath.
