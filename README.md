# Customer Frontend
## Available scripts
### yarn start 
- Chạy app trên môi trường development.
- Mở [http://localhost:3000](http://localhost:3000) để sử dụng.
### yarn build
- Build app cho môi trường production.
### yarn lint
- Kiểm tra syntax của script với linter trước khi commit.

## Structure
 Cấu trúc thư mục được chia theo từng components:
- public: Lưu static file.
- src:
    - components: Chứa các core component có thể reuse ở  nhiều  nơi.
        - index.js: Combine tất cả components.
        - Button.js
        ...
    - reducers: Chứa các reducer để thay đổi __state__ dựa theo __action type__ 
        - index.js: Combine tất cả reducers.
        - reducerA.js
        ...
    - services: Chứa các class hoặc function được viết riêng để phục vụ cho một số yêu cầu mang tính đặc thù.
        - index.js: Combine tất cả services.
        - storage: Class phục vụ local storage và session.
            - base.js
            - local.js
            - session.js
        - api.js: Class phục vụ cho việc gọi api.
        ...
    - utils: Chứa các utility function.
        - index.js: Combine tất cả utils.
        - debug.js
        ...
    - views: Chứa các page, mỗi page sẽ có những component con tương ứng.
        - ViewA:
            - ComponentA:
                - index.js: Nơi xây dựng nên component (styled-component (css) + html + function component).
                - actions.js: Chứa các action được __dispatch__ bởi component A theo từng __type__ tương ứng.
                - selectors.js _(optional)_: Chứa các selector phức tạp hoặc [memoized selector](https://daveceddia.com/redux-selectors/) 
            - ComponentB:
                - index.js
                - actions.js
            - index.js: Nơi xây dựng nên viewA (build từ các component con) => root component
            - styles.css _(optional)_: style cho viewA (bao gồm các component con)
            - customHook.js _(optional)_: Nơi viết các [custom hook](https://reactjs.org/docs/hooks-custom.html) để reuse cho những component có thể dùng chung.
    - constants.js: Chứa các contanst và action type
    - index.js
    - store.js
## References
- Final project description: https://hackmd.io/@nndkhoa9/wnc-ibprj
- React Hook: https://reactjs.org/docs/hooks-intro.html
- Redux Hook: https://react-redux.js.org/api/hooks
- Styled component: https://styled-components.com