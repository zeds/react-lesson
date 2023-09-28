😺[01_first_tom]
npm create vite@latest .


😺[01_first_amila]
😺[01_first_mexroj]
😺[01_first_asya]
😺[01_first_asil]


😺[02_image_gallery_tom]
npm create vite@latest .
JavaScript + SWC
src/index.cssを削除
src/main.jsxからindex.cssのimportを削除
src/App.cssは、いつものコードを書く。* { }
src/App.jsxは、<>あいうえお</>

npm install react-image-gallery

<App.jsx>
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

exampleがあるのでコピー

npm i react-image-gallery

😺[03_detail_tom]
APIの呼び出しなどを学びましたが、
次のレッスンでCRUDを学びます。


04_crud_asya
04_crud_mexroj
04_crud_amila

😺[04_crud_tom]
CRUDはデータベースの操作の基本です
C: Create
R: Read
U: Update
D: Delete

ユーザーのコメントのRead
ユーザーコメントの投稿 Create
コメントの修正 Update
コメントの削除 Delete
を学びます。

テーブルは、MercariCommentを利用します。
https://lusty.asia:1443/api/mercari-comments

✅npm create vite@latest .
JavaScript : SWC

npm i styled-components@latest
npm i @types/styled-components
npm i @tanstack/react-query
npm i -D @tanstack/eslint-plugin-query
npm i @tanstack/react-query-devtools

1. src/index.cssを削除
2. src/main.jsxの4行目のimport index.cssを削除
3. src/App.cssの中身を削除して、新規に * { }から書く
4. src/App.jsxのreturnの中の不要なコードを削除、importも削除

Kyle
https://www.youtube.com/watch?v=lVLz_ASqAio&t=56s

react-hook-form
プログラミングチュートリアル
https://www.youtube.com/watch?v=f1fysEKNwQA&t=1228s

※入力した値をuseStateで格納する場合は、タイプする毎にレンダリングされてしまう
useStateのかわりに、useRefを使いましょう。
React. useRef will allow you to write forms without re-render the component for each user input optimizing the application at the expense of real-time controls, enabling/disabling the form submit button based on the user input and previews.

✅React forms — useState vs useRef
https://levelup.gitconnected.com/react-forms-usestate-vs-useref-5cb584cc19fd\


✅投稿したら、viewを更新する
https://zenn.dev/masatakaitoh/articles/3c2f8602d2bb9d


✅tanstack query
基本的には、GETのときにuseQueryを、PUT・POST・DELETEのときにuseMutationを使います。
https://zenn.dev/t_keshi/articles/react-query-prescription

✅optimistic update
https://qiita.com/suzuki0430/items/1812e600797bba661cef
https://reffect.co.jp/react/tanstack-query/#%E3%82%B5%E3%83%BC%E3%83%90%E5%81%B4%E3%81%A7%E3%81%AE%E6%9B%B4%E6%96%B0%E5%87%A6%E7%90%86


😺[05_search_tom]
useQueryに検索機能を実装します


😺[06_editor_tom]
記事を編集するためのeditorのサンプルを作成します
Editor.jsというライブラリを使います
https://editorjs.io/

node -v
v18.17.0

npm -v
10.1.0

npm create vite@latest .
TypeScript + SWC
src/index.cssを削除
src/main.jsxからindex.cssのimportを削除

npm i styled-components
npm i @types/styled-components
❌npm i @editorjs/editorjs
npm i react-editor-js


react-editor-js
https://www.npmjs.com/package/react-editor-js?activeTab=readme

sample
https://codesandbox.io/s/react-editorjs-example-ng6qzo

ビルド中❌
https://walkthrough.so/pblc/snKICMzxzedr/codelab-integrating-editor-js-into-your-react-application


コピペ作業中
https://codesandbox.io/s/react-editorjs-example-ng6qzo?file=/src/styles.css


https://zenn.dev/nicopin/articles/e0e1dfddd17a80

npm i @editorjs/header
npm i @editorjs/checklist
npm i @editorjs/code
npm i @editorjs/delimiter
npm i @editorjs/editorjs
npm i @editorjs/embed
npm i @editorjs/image
npm i @editorjs/inline-code
npm i @editorjs/link
npm i @editorjs/list
npm i @editorjs/marker
npm i @editorjs/paragraph
npm i @editorjs/quote
npm i @editorjs/raw
npm i @editorjs/simple-image
npm i @editorjs/table
npm i @editorjs/warning
npm i @editorjs/editorjs
npm i editorjs-html
npm i html-react-parser


😺[07_editorjs_tom]
npm create vite@latest .
JavaScript + SWC
npm i @editorjs/editorjs
npm i styled-components
npm i @types/styled-components

https://www.youtube.com/watch?v=5XmYCd9K5-8&t=171s

✅動いてる
sayfullayevmexroj27@gmail.com


😺[09_pagination_tom]
npm create vite@latest .
JavaScript + SWC

https://www.npmjs.com/package/react-paginate


npm i react-paginate




ー以上

