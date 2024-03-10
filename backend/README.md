## Installation

`.env_template`을 `.env`로 바꾸고 알맞은 값을 넣습니다.

mongodb의 경우 `mongodb+srv://username:password@cluster0.mongodb.net/admin` 등과 같이 적습니다.

```bash
$ npm install
$ npx prisma generate
```

db와의 연동이 필요하다면 다음 명령어 중 하나를 필요에 맞게 실행합니다.

```bash
$ npx prisma db pull # db에서 가져올 때
$ npx prisma db push # db를 업데이트할 때
```

## API Endpoint

### GET /

"Hello World!" 문자열을 반환합니다.

- 위치: `src/app.controller.ts`

### POST /user

user를 등록합니다. 성공해도 로그인시키지 않습니다.

- 성공시

| field | type |
| ----- | ---- |
| res   | "ok" |

- 실패시
  - BadRequest
    - 필드가 제대로 채워지지 않음
    - userId가 중복됨
  - Unauthorized
    - 로그인되어 있음

### GET /user/:userId

userId에 해당하는 user 객체를 반환합니다.

- Query

`exist`: 참이면 존재하는지만 확인합니다.

- 성공시

`exist`이 참이면 다음을 반환합니다. 존재하지 않더라도 에러를 반환하지 않습니다.

| field | type    |
| ----- | ------- |
| exist | boolean |

그 외에는 존재하는 경우에 다음을 반환합니다.

| field     | type   |
| --------- | ------ |
| user_id   | string |
| user_name | string |
| email     | string |

본인인 경우, 추가 정보를 전달합니다.

| field         | type   |
| ------------- | ------ |
| phone_number  | string |
| user_realname | string |

- 실패시
  - BadRequest
    - userId가 존재하지 않음

### PUT /user/:userId

userId에 해당하는 user의 정보를 수정합니다.

- 성공시

| field | type |
| ----- | ---- |
| res   | "ok" |

- 실패시
  - Unauthorized
    - 로그인을 하지 않음
  - BadRequest
    - 필드가 모두 없음
    - 형식에 맞지 않음
    - 본인이 아님

### DELETE /user/:userId

user을 삭제합니다. 로그아웃시킵니다.

- 성공시

| field | type |
| ----- | ---- |
| res   | "ok" |

- 실패시
  - Unauthorized
    - 로그인을 하지 않음
    - 본인이 아님

### POST /auth/login

id, password를 통해 로그인을 시도합니다. 성공하면 세션을 연결합니다.

- Request

  - id: string
  - password: string

- 성공시

| field | value | type   |
| ----- | ----- | ------ |
| res   | "ok"  | string |

- 실패시

  - Unauthorized
    - 아이디 패스워드가 맞지 않음
    - 필드가 제대로 채워지지 않음

- 위치: `src/modules/auth/auth.controller.ts`

### POST /auth/logout

### GET /post

모든 post를 가져옵니다.

- Query

| field   | type | description                      |
| ------- | ---- | -------------------------------- |
| maxPost | int  | 최대 개수, 기본값은 6            |
| page    | int  | page수, 1-based로 셈, 기본값은 1 |

쿼리가 잘못되었거나 `maxPost`가 너무 크다면(50 초과) 기본값으로 설정합니다.

- 성공시

| field      | type   |
| ---------- | ------ |
| posts      | Post[] |
| totalPages | int    |

- 실패시

### POST /post

post를 등록합니다.

- 성공시

| field | type |
| ----- | ---- |
| res   | "ok" |

- 실패시
  - Unauthorized
    - 로그인하지 않음
  - BadRequest
    - 필드가 제대로 채워지지 않음

### GET /post/:postKey

postKey에 해당하는 key의 post를 가져옵니다.

- 성공시

Post 객체 배열을 반환합니다. 각 개체에 다음도 추가하여 반환합니다.

| field | type    |
| ----- | ------- |
| like  | boolean |

- 실패시
  - NotFound
    - postKey가 유효하지 않음

### PUT /post/:postKey

postKey에 해당하는 key의 post를 수정합니다.

- 성공시

| field | type |
| ----- | ---- |
| res   | "ok" |

- 실패시
  - Unauthorized
    - 로그인을 하지 않음
  - BadRequest
    - 필드가 모두 비어있음
    - postKey가 유효하지 않음
    - 작성자가 본인이 아님

### DELETE /post/:postKey

postKey에 해당하는 key의 post를 삭제합니다.

- 성공시

| field | type |
| ----- | ---- |
| res   | "ok" |

- 실패시
  - Unauthorized
    - 로그인하지 않음
  - BadRequest
    - postKey가 유효하지 않음
    - 작성자가 본인이 아님

### (TEST용) POST /post/image

## License

Nest is [MIT licensed](LICENSE).
