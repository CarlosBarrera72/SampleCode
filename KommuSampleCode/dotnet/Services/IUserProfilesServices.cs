using Sabio.Models;
using Sabio.Models.Requests;
using Sabio.Models.UserProfiles;

namespace Sabio.Services.UserProfiles
{
    public interface IUserProfilesServices
    {
        UserProfile GetById(int id);

        UserProfile GetCurrentUser(int id);

        Paged<UserProfile> GetUserProfileAll(int pageIndex, int pageSize);

        Paged<UserProfile> Search(int pageIndex, int pageSize, string query);

        int AddProfile(UserProfileAddRequest model, int userId);

        void UpdateProfile(UserProfileUpdateRequest model, int userId);

        void DeleteProfile(int id, int userId);
    }
}