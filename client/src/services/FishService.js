import Api from '@/services/Api'
export default {
    index (search) {
        return Api().get('fishs', {
            params: {
                search: search
            }
        })
    },
    show(fishId) {
        return Api().get('fish/' + fishId)
    },
    post(fish) {
        return Api().post('fish', fish)
    },
    put(fish) {
        return Api().put('fish/' + fish.id, fish)
    },
    delete(fish) {
        return Api().delete('fish/' + fish.id, fish)
    },
}