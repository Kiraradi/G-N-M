import { isValidNumber } from '../../services/isValidNumber';
import './popupGeolocation.css';
export default class PopupGeolocation {
    constructor(container) {
        this.container = container;
        this.getGeolocationFromPopupCollback = () => {};
    }

    drawUI() {
        this.popupEl = document.createElement("div");
        this.popupEl.classList.add("popup");
    
        const popupFormEl = document.createElement("form");
        popupFormEl.classList.add("popup-form");
    
        const popupTitleEl = document.createElement("h2");
        popupTitleEl.classList.add("popup-title");
        popupTitleEl.textContent = "Что-то пошло не так";
    
        popupFormEl.appendChild(popupTitleEl);

        const popupDescriptionEl = document.createElement("h2");
        popupDescriptionEl.classList.add("popup-description");
        popupDescriptionEl.textContent = "К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введити кардинаты вручную";
    
        popupFormEl.appendChild(popupDescriptionEl);
        popupFormEl.appendChild(this.getInputEl());
        popupFormEl.appendChild(this.getButtonEl());
        this.popupEl.appendChild(popupFormEl);
    
        popupFormEl.addEventListener("submit", (e) => {
          e.preventDefault();
        });
    
        this.container.appendChild(this.popupEl);
      }
    
      getInputEl() {
        const inputWraper = document.createElement("div");
        inputWraper.classList.add("input-wraper");

        const inputTitle = document.createElement('h2');
        inputTitle.classList.add('input-title');
        inputTitle.textContent = 'Широта и долгота через запятую';

        inputWraper.appendChild(inputTitle);

        this.inputEl = document.createElement("input");
        this.inputEl.classList.add("input");
        this.inputEl.setAttribute('placeholder', 'Например: 54.785 - 87.759');

        inputWraper.appendChild(this.inputEl);

        this.inputEl.addEventListener('input', () => {
          this.inputEl.value = this.inputEl.value.replace(/[A-Za-zA-Яа-яЁё]/g, '');
          if (this.inputEl.classList.contains('input_red_line')) {
            this.inputEl.classList.remove('input_red_line');
          }
        })
    
        return inputWraper;
      }
    
      getButtonEl() {
        const buttonsWraper = document.createElement("div");
        buttonsWraper.classList.add("buttons-wraper");

        const cancellationButton = document.createElement("button");
        cancellationButton.classList.add("button", "cancellation-button");
        cancellationButton.textContent = "Отмена";
        buttonsWraper.appendChild(cancellationButton);

        cancellationButton.addEventListener('click', () => {
          this.removePopup();
        })
    
        const entranceButton = document.createElement("button");
        entranceButton.classList.add("button", "entrance-button");
        entranceButton.textContent = "Ок";
        buttonsWraper.appendChild(entranceButton);
    
        entranceButton.addEventListener("click", (e) => {
          e.preventDefault();
          const value = isValidNumber(this.inputEl.value)
          if (value) {
            this.inputEl.value = "";
            this.getGeolocationFromPopupCollback(value);
            this.removePopup();
          } else {
            this.inputEl.classList.add('input_red_line');
          }
        });
        return buttonsWraper;
      }
    
      removePopup() {
        this.inputEl.value = "";
        this.popupEl.remove();
      }
}
    
