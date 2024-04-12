import Person from './Person'

export default class PeopleList {
    private static _instance: PeopleList
    list: Person[]

    private constructor() {
        this.list = []
    }

    static get instance(): PeopleList {
        if (!PeopleList._instance) {
            PeopleList._instance = new PeopleList()
        }
        return PeopleList._instance
    }

    addPerson(person: Person): void {
        this.list.push(person)
    }

    removePerson(personId: string): void {
        this.list = this.list.filter(person => person.id !== personId)
    }

    selectPerson(personId: string): void {
        this.list.forEach(person => {
            person.selected = person.id === personId
        })
    }

    load(): void {
        const savedData = localStorage.getItem('peopleListData');
        if (savedData) {
            this.list = JSON.parse(savedData)
        }
    }
    
    clear(): void {
        this.list = []; 
    }
}
