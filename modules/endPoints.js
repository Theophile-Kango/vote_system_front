import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from './url'

const apiUrl = url;
  process.env.NODE_ENV === "development" && "http://localhost:3000";
const defaultOptions = {
  host: apiUrl,
  mode: "local",
  debug: false,
  useRoles: false,
};
const storage = AsyncStorage;
const storageKey = "auth-storage";

class EndPoint {
  constructor(options) {
    this.options = { ...defaultOptions, ...options };
    this.roles = options.useRoles ? [] : undefined;
    this.apiUrl = `${options.host}${options.prefixUrl ? options.prefixUrl : ""
      }`;
    this.apiNewDateVoteUrl = `${this.apiUrl}${options.apiNewDateVoteUrl ? options.apiNewDateVoteUrl : "/api/date_vote"
      }`;
    this.deleteUserUrl = `${this.apiUrl}${options.deleteUserUrl ? options.deleteUserUrl : "/auth"
      }`;
    this.apiGetDateVotesUrl = `${this.apiUrl}${options.apiGetDateVotesUrl ? options.apiGetDateVotesUrl : "/api/date_vote"
      }`;
    this.apiNewCandidateUrl = `${this.apiUrl}${options.apiNewCandidatUrl ? options.apiNewCandidatUrl : "/api/candidate"
      }`;
    this.apiNewVoteUrl = `${this.apiUrl}${options.apiNewVoteUrl ? options.apiNewVoteUrl : "/api/vote"
      }`;
    this.apiGetCandidatesUrl = `${this.apiUrl}${options.apiGetCandidatesUrl ? options.getCandidatesResponse : "/api/candidate"
      }`;
    this.apiGetVotesUrl = `${this.apiUrl}${options.apiGetVotesUrl ? options.getVotesResponse : "/api/vote"
      }`;
    this.apiGetUsersUrl = `${this.apiUrl}${options.apigetUsersResponse ? options.apigetUsersResponse : "/api/list_users"
      }`;

    axios.interceptors.response.use(
      (response) => {
        if (Array.isArray(response.data)) {
          return {
            ...response,
            total: parseInt(response.headers["data-count"]),
          };
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  test() {
    axios
      .get(this.signInUrl)
      .then((response) => {
        console.log(`Connection success: `);
        console.table(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Connection success");
        } else {
          console.log("Connection errror");
        }
      });
  }
  

  newDateVote(fields) {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const newDateVoteResponse = await axios.post(
          this.apiNewDateVoteUrl,
          {
            ...fields,
          },
          { headers: JSON.parse(result) }
        
        );
        resolve(newDateVoteResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteUser(user) {
    this.session = storage.getItem(storageKey);
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const deleteUser = await axios.delete(this.deleteUserUrl, {
            headers: JSON.parse(result),
            data: { user }
          }, 
        );
        //console.log(user)
        resolve(deleteUser);
      } catch (err) {
        reject(err);
      }
    });

    // return new Promise(async (resolve, reject) => {
    //   const result = await this.session;
    //   try {
    //     const removeUser = await axios.delete(
    //       this.deleteUserUrl,
    //       {
    //         ...user,
    //       },
    //       { headers: JSON.parse(result) }
        
    //     );
    //     resolve(removeUser);
    //   } catch (error) {
    //     reject(error);
    //   }
    
    // })
  }

  

  newCandidate(fields) {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const newCandidateResponse = await axios.post(
          this.apiNewCandidateUrl,
          {
            ...fields,
          },
          { headers: JSON.parse(result) }
        
        );
        resolve(newCandidateResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  newVote(fields) {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const newVoteResponse = await axios.post(
          this.apiNewVoteUrl,
          {
            ...fields,
          },
          { headers: JSON.parse(result) }
        
        );
        resolve(newVoteResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCandidates() {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const getCandidatesResponse = await axios.get(
          this.apiGetCandidatesUrl,
          { headers: JSON.parse(result) }
        
        );
        resolve(getCandidatesResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  getVotes() {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const getVotesResponse = await axios.get(
          this.apiGetVotesUrl,
          { headers: JSON.parse(result) }
        
        );
        resolve(getVotesResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  getDateVotes() {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const getDateVotesResponse = await axios.get(
          this.apiGetDateVotesUrl,
          { headers: JSON.parse(result) }
        
        );
        resolve(getDateVotesResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

  getUsers() {
    this.session = storage.getItem(storageKey);
      
    return new Promise(async (resolve, reject) => {
      const result = await this.session;
      try {
        const getUsersResponse = await axios.get(
          this.apiGetUsersUrl,
          { headers: JSON.parse(result) }
        
        );
        resolve(getUsersResponse);
      } catch (error) {
        reject(error);
      }
    });
  }

}

export default EndPoint;