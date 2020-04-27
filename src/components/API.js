import axios from 'axios';

export default class API
{
    static URL_API = ' http://api.tvmaze.com/';
    static instance = null;

	_q = null;

    constructor()
    {
		this.loadData();
    }

    static getInstance()
    {
        if (this.instance == null)
            this.instance = new API();

        return this.instance;
    }


	getQuery() { return this._q; }

    setQuery(val)
    {
        this._q = val;
        localStorage.setItem('_q', this._q);
    }


	loadData()
	{
	    this._q = localStorage.getItem('_q');
	}

    /**
     * All in one get request for the application
     * Type: GET
     *
     * @returns {Promise} A promise
     */
    GET (path, params = {}, id = null, timeout = 10000, access_token = true)
    {
        return new Promise((resolve, reject) =>
        {
            axios.get(`${API.URL_API}${path}` + (id ? `/${id}` : ``),
                {
                    params: params,
                    timeout
                })
                .then(response =>
                {
                    resolve(response.data);
                })
                .catch(error =>
                {
                    reject(error);
                });
        });
    }


}
