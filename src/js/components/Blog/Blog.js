import createDomElement from "../../services/CreateDomElement ";
import Post from "../../models/Post";
import { PostTypes } from "../../models/Post";
import "./Blog.css";

export default class Blog {
  constructor(container) {
    this.container = container;
  }

  drawUI() {
    const blogEl = createDomElement('div', 'blog');
    
    const postListWrapper = createDomElement('div', 'post-list-wrapper');
    const lineWithPointsEl = createDomElement('div', 'line-with-points');
    postListWrapper.appendChild(lineWithPointsEl);
    
    this.postListEl = createDomElement('ul','post-list');
    postListWrapper.appendChild(this.postListEl);
    
    blogEl.appendChild(postListWrapper);
    blogEl.appendChild(this.getFormEl());
    
    this.container.appendChild(blogEl);
  }

  getFormEl() {
    const formEl = createDomElement('form', 'post-form');
    
    const textareaEl = createDomElement('textarea', 'post-textarea');
    textareaEl.addEventListener('keyup', (e) => {
      if (e.code == 'Enter' && textareaEl.value && textareaEl.value.trim()) {
        const post = new Post(PostTypes.text, textareaEl.value);
        this.postListEl.appendChild(this.getPostEl(post));
        textareaEl.value = '';
      }
    });

    formEl.appendChild(textareaEl);
    return formEl;
  }

  getPostEl(post) {
    const postEl = createDomElement('li', 'post');
    const contentWrapperEl = createDomElement('div', 'content-wrapper');
    postEl.appendChild(contentWrapperEl);
    let contentEl = null;

    if (post.type === PostTypes.text) {
      contentEl = createDomElement('div', 'content-text');
      contentEl.textContent = post.content;
    }

    contentWrapperEl.appendChild(contentEl);
    const timeEl = createDomElement('div', 'time');
    timeEl.textContent = post.time;
    postEl.appendChild(timeEl);
    
    return postEl;
  }
}