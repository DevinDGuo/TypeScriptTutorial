export default class Person {
    id: string
    name: string
    selected: boolean

    constructor(id: string, name: string) {
        this.id = id
        this.name = name
        this.selected = false
    }
}