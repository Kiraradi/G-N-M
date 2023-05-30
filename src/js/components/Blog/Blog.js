import createDomElement from "../../services/CreateDomElement ";
import Post from "../../models/Post";
import { PostTypes } from "../../models/Post";
import PopupGeolocation from "../popupGeolocation/popupGeolocation";
import "./Blog.css";

export default class Blog {
  constructor(container) {
    this.container = container;
    this.getGeolocationFromPopupCollback = this.getGeolocationFromPopupCollback.bind(this);
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
    
  this.textareaEl = createDomElement('textarea', 'post-textarea');
  this.buttonEl = createDomElement('button', 'button-submit');
  this.textareaEl.addEventListener('keyup', (e) => {
      if (e.code == 'Enter' && this.textareaEl.value && this.textareaEl.value.trim()) {
        this.buttonEl.click();
      }
    });
  this.buttonEl.addEventListener('click', (e) => {
    e.preventDefault();
    this.getGeolocation();
  })

    formEl.appendChild(this.textareaEl);
    formEl.appendChild(this.buttonEl);
    return formEl;
  }

  addPostEl() {    
    const post = new Post(PostTypes.text, this.textareaEl.value, this.position);
    this.textareaEl.value = '';
    const postEl = createDomElement('li', 'post');
    const contentWrapperEl = createDomElement('div', 'content-wrapper');
    postEl.appendChild(contentWrapperEl);
    let contentEl = null;

    if (post.type === PostTypes.text) {
      contentEl = createDomElement('div', 'content-text');
      contentEl.textContent = post.content;
    }

    const geolocationEl = createDomElement('div', 'geolocation');
    geolocationEl.textContent = post.geolocation;


    contentWrapperEl.appendChild(contentEl);
    contentWrapperEl.appendChild(geolocationEl);
    const timeEl = createDomElement('div', 'time');
    timeEl.textContent = post.time;
    postEl.appendChild(timeEl);
    console.log(post);
    
    this.postListEl.prepend(postEl);
  }

  getGeolocation() {
    this.position = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const {latitude, longitude} = data.coords;
        this.position = `[${latitude.toFixed(4)} - ${longitude.toFixed(4)}]`
        this.addPostEl();

      }, (err) => {
        console.log(err);
        const popupGeolocation = new PopupGeolocation(this.container);
        popupGeolocation.getGeolocationFromPopupCollback = this.getGeolocationFromPopupCollback;
        popupGeolocation.drawUI();
      } )
    }

    
  }

  getGeolocationFromPopupCollback(geolocation) {
    this.position = geolocation;
    this.addPostEl();
  }
}