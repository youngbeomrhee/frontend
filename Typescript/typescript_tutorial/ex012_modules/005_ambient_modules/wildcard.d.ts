declare module "*!text" {
    let content: string;
    export default content;
}
// 일부는 그 반대의 방법을 사용합니다.
declare module "json!*" {
    const value: any;
    export default value;
}