import { Container } from 'unstated';
import axios from 'axios';
import Cookies from 'js-cookie'



class PlacesContainer extends Container {
    state = {
        allPlaces: [],
        allLists: [],
        allUserLists: [],

    }

    async getPlaces() {
        axios.get(`/places/`)
            .then(res => {
            const data = res.data;
            this.setState({ allPlaces: data });
            })

    }
    async getLists() {
        axios.get(`/list/`, {
            params:
        {
          'user_id': Cookies.get("user_id")
        }
        })
            .then(res => {
            const data = res.data;
            this.setState({ allLists: data });
            })
    }
    async getAllLists() {
        axios.get(`/all_lists/`, {
        })
            .then(res => {
            const data = res.data;
            this.setState({ allUserLists: data });
            })

    }

}

export default PlacesContainer