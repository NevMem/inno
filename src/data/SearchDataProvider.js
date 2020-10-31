import backendApi from "../api/BackendApi";

class SearchDataProvider {
    constructor() {
        this.books = [
            {
                name: "Преступление и наказание",
                description: "Социально-психологический и социально-философский роман Фёдора Михайловича Достоевского, над которым писатель работал в 1865-1866 годах. Впервые опубликован в 1866 году в журнале «Русский вестник». Через год вышло в свет отдельное издание, структура которого была немного изменена по сравнению с журнальной редакцией; кроме того, автор внёс в книжный вариант ряд сокращений и стилистических правок.",
                img: 'https://cdn.ast.ru/v2/ASE000000000703427/COVER/cover1__w600.jpg',
                author: "Ф. М. Достоевский"
            },
            { name: "Война и мир", author: "Л. Н. Толстой" },
            { name: "Архипелаг ГУЛАГ", author: "А. И. Солженицын" },
            { name: "Правда и действие" },
            {
                name: "Что такое JOJO?",
                img: "https://upload.wikimedia.org/wikipedia/ru/c/cd/JoJos_Bizarre_Adventure.jpg",
                description: "JoJo's Bizarre Adventure is a Japanese manga series written and illustrated by Hirohiko Araki. It was serialized in Weekly Shōnen Jump from 1987 to 2004, and was transferred to the monthly seinen manga magazine Ultra Jump in 2005"
            },
            { name: "Ремнем его! Или что делать если ребенок смотрит аниме" },
            { name: "Путеводитель по современной музыке" },
            { name: "История младшего разработчика вашего анала" },
            { name: "Все реплики Роршаха из хранителей" },
        ]
        this.savedBooks = [
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

    transformIntoFrontTypes(elem) {
        return {
            ...elem,
            name: elem.title,
            author: elem.author
        }
    }

    querySuggests(query) {
        return backendApi.search(query)
            .then(data => {
                console.log(data)
                return data
            })
            .then(data => data.map(this.transformIntoFrontTypes))
    }

    getSavedBooks() {
        return new Promise((res, rej) => {
            res(this.savedBooks)
        })
    }

    removeBook(book) {
        return new Promise((res, rej) => {
            if (this.savedBooks.indexOf(book) === -1) {
                res()
                return
            }
            this.savedBooks.splice(this.savedBooks.indexOf(book), 1)
            res()
            this.listeners.forEach(listener => {
                listener.savedUpdated()
            })
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

const searchData = new SearchDataProvider()

export default searchData
