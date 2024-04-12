import PeopleList from "../model/PeopleList";
import Person from "../model/Person";

interface DOMPeopleList {
    ul: HTMLUListElement,
    clear(): void,
    render(peopleList: PeopleList): void,
}

export default class PeopleTemplate implements DOMPeopleList {
    ul: HTMLUListElement;

    static instance: PeopleTemplate = new PeopleTemplate();

    private constructor() {
        this.ul = document.getElementById("peopleList") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(peopleList: PeopleList): void {
        this.clear();

        peopleList.list.forEach(person => {
            const li = document.createElement("li") as HTMLLIElement;
            li.textContent = person.name;
            li.setAttribute('data-id', person.id);
            
            if (person.selected) {
                li.classList.add('selected'); // Add a class for styling selected items
            }

            li.addEventListener('click', () => {
                // Toggle selection when clicked
                person.selected = !person.selected;
                peopleList.selectPerson(person.id);
                this.render(peopleList); // Re-render after selection change
            });

            this.ul.appendChild(li);
        });
    }
}
