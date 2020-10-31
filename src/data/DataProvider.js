import backendApi from "../api/BackendApi";

export default class DataProvider {
    transformToFrontTypes(elem) {
        return {
            name: elem.title,
            description: elem.author
        }
    }

    loadData() {
        return new Promise((res, rej) => {
            backendApi.recommend()
            .then(data => {
                res(data.map(this.transformToFrontTypes))
            })
            /* res([
                {
                    name: 'Событие в Питерской парадной',
                    imgUrl: 'https://gdb.rferl.org/5F1F4B83-774D-4B59-BC31-F27455747DE1_cx0_cy10_cw0_w1597_n_r1_st.jpg',
                    description: 'Все очень плохо, опять все под солями'
                },
                {
                    name: 'Детский кружок по лепке',
                    imgUrl: 'https://i.ytimg.com/vi/us_0mWiq9i0/maxresdefault.jpg',
                    description: 'Просто дети глину месят'
                },
                {
                    name: 'Почитать в понедельник',
                    imgUrl: 'https://bessmertnybarak.ru/img/books/1532385789.jpg',
                    description: 'Понедельник - ужасный день, тем болеее в России, так что начинаем неделю с книги Александра Исаевича Солженицына Архипелаг Гулаг'
                }
            ]) */
        })
    }
}
