

export default class SearchDataProvider {
    constructor() {
        this.books = [
            { name: "Преступление и наказание" },
            { name: "Война и мир" },
            { name: "Архипелаг ГУЛАГ" },
            { name: "Правда и действие" },
            { name: "Что такое JOJO?" },
            { name: "Ремнем его! Или что делать если ребенок смотрит аниме" },
            { name: "Путеводитель по современной музыке" },
            { name: "История младшего разработчика вашего анала" },
            { name: "Все реплики Роршаха из хранителей" },
        ]
        this.savedBooks = [
            this.books[0]
        ]
        this.listeners = []
    }

    addListener(listener) {
        this.listeners.push(listener)
    }

    removeListener(listener) {
        var index = -1
        for (let i = 0; i !== this.listeners.length; ++i) {
            if (this.listeners[i] === listener) {
                index = i
            }
        }
        this.listeners.splice(index, 1)
    }

    querySuggests(query) {
        return new Promise((res, rej) => {
            if (query.length === 0) {
                res([])
                return
            }
            let result = this.books.filter(book => {
                return book.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            })
            res(result)
        })
    }

    getSavedBooks() {
        return new Promise((res, rej) => {
            res(this.savedBooks)
        })
    }

    saveBook(book) {
        return new Promise((res, rej) => {
            if (this.savedBooks.indexOf(book) === -1) {
                this.savedBooks.push(book)
            }
            res()
            this.listeners.forEach(listener => {
                listener.savedUpdated()
            })
        })
    }
}