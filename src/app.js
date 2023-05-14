import Blog from "./js/components/Blog/Blog";

const blogWraper = document.querySelector('.blog-wrapper');
const blog = new Blog(blogWraper);

blog.drawUI();