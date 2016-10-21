/**
 * Created by yblee on 2016-10-21.
 */
// 부모생성자
function Article() {
  this.tags = ['js', 'css'];
}
var article = new Article();

// 클래스 방식의 패턴 #1을 사용해 article 객체를 상속하는 blog 객체를 생성한다.
function BlogPost() {}
BlogPost.prototype = article;
var blog = new BlogPost();
// 여기서는 이미 인스턴스가 존재하기 때문에 'new Article()'을 쓰지 않았다.

// 생성자 빌려쓰기 패턴을 사용해 article을 상속하는 page 객체를 생성한다.
function StaticPage() {
  Article.call(this);
}
var page = new StaticPage();

console.log(article.hasOwnProperty('tags'));  // true
console.log(blog.hasOwnProperty('tags'));  // false
console.log(page.hasOwnProperty('tags'));  // true

blog.tags.push('html');   // 부모의 멤버가 수정
page.tags.push('php');    // 복사본이므로 자기 자신의 멤버가 수정
console.log(article.tags.join(', '));
