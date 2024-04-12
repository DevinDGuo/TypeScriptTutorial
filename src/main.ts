import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';
import PeopleList from './model/PeopleList';
import Person from './model/Person';
import PeopleTemplate from './templates/PeopleTemplate';

const initApp = (): void => {
    const fullList = FullList.instance;
    const peopleList = PeopleList.instance;
    const template = ListTemplate.instance;
    const peopleTemplate = PeopleTemplate.instance;

    // Todo List Setup
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;

    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault();

        const input = document.getElementById("newItem") as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) return;

        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;

        const priorityInput = prompt('Enter priority for this task (1-3):');
        const priority = priorityInput ? parseInt(priorityInput) : 1;

        const newItem = new ListItem(itemId.toString(), newEntryText, false, priority);

        fullList.addItem(newItem);

        template.render(fullList);
    });

    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;

    clearItems.addEventListener('click', (): void => {
        fullList.clearList();
        template.clear();
    });

    fullList.load();
    template.render(fullList);

    // People Management Setup
    const addPersonButton = document.getElementById("addPersonButton") as HTMLButtonElement;
    const removePersonButton = document.getElementById("removePersonButton") as HTMLButtonElement;
    const clearPeopleList = document.getElementById("clearPeopleList") as HTMLButtonElement;

    addPersonButton.addEventListener('click', (): void => {
        const personName = prompt('Enter the name of the person:');
        if (personName) {
            const newPerson = new Person(Date.now().toString(), personName);
            peopleList.addPerson(newPerson);
            peopleTemplate.render(peopleList);
        }
    });

    removePersonButton.addEventListener('click', (): void => {
        const selectedPerson = peopleList.list.find(person => person.selected);
        if (selectedPerson) {
            peopleList.removePerson(selectedPerson.id);
            peopleTemplate.render(peopleList);
        } else {
            alert('Please select a person to remove.');
        }
    });

    clearPeopleList.addEventListener('click', (): void => {
        peopleList.clear();
        peopleTemplate.render(peopleList);
    });

    peopleList.load();
    peopleTemplate.render(peopleList);
}

document.addEventListener("DOMContentLoaded", initApp);
