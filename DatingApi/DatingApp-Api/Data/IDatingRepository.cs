using DatingApp_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp_Api.Data
{
    public interface IDatingRepository
    {

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();
        Task<User> GetUser(int id);

        Task<IEnumerable<User>> GetUsers();

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);



    }
}
