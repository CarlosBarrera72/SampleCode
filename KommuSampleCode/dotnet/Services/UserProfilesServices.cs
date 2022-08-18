using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Requests;
using Sabio.Models.UserProfiles;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.UserProfiles
{
    public class UserProfilesServices : IUserProfilesServices
    {
        IDataProvider _data = null;

        public UserProfilesServices(IDataProvider data)
        {
            _data = data;
        }

        public UserProfile GetById(int id)
        {
            string procName = "[dbo].[UserProfiles_Select_ById]";

            UserProfile profile = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                profile = SingleUserProfileMapper(reader, ref startingIndex);

            });
            return profile;
        }

        public UserProfile GetCurrentUser(int id)
        {
            string procName = "[dbo].[UserProfiles_SelectByUserId]";

            UserProfile profile = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                profile = SingleUserProfileMapper(reader, ref startingIndex);

            });
            return profile;
        }

        public Paged<UserProfile> GetUserProfileAll(int pageIndex, int pageSize)
        {
            Paged<UserProfile> pagedResult = null;

            List<UserProfile> result = null;

            int totalCount = 0;

            string procName = "[dbo].[UserProfiles_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parmCol)
            {
                parmCol.AddWithValue("@PageIndex", pageIndex);
                parmCol.AddWithValue("@PageSize", pageSize);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                UserProfile profile = SingleUserProfileMapper(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (result == null)
                {
                    result = new List<UserProfile>();
                }

                result.Add(profile);
            });
            if (result != null)
            {
                pagedResult = new Paged<UserProfile>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Paged<UserProfile> Search(int pageIndex, int pageSize, string query)
        {
            Paged<UserProfile> pagedResult = null;

            List<UserProfile> result = null;

            int totalCount = 0;

            string procName = "[dbo].[UserProfiles_Search]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parmCol)
            {
                parmCol.AddWithValue("@PageIndex", pageIndex);
                parmCol.AddWithValue("@PageSize", pageSize);
                parmCol.AddWithValue("@Query", query);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                UserProfile profile = SingleUserProfileMapper(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (result == null)
                {
                    result = new List<UserProfile>();
                }

                result.Add(profile);
            });
            if (result != null)
            {
                pagedResult = new Paged<UserProfile>(result, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public int AddProfile(UserProfileAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[UserProfiles_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void UpdateProfile(UserProfileUpdateRequest model, int userId)
        {
            string procName = "[dbo].[UserProfiles_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                AddCommonParams(model, col,userId);

            }, returnParameters: null);
        }

        public void DeleteProfile(int id, int userId)
        {
            string procName = "[dbo].[UserProfiles_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);


                }, returnParameters: null);
        }

        private static UserProfile SingleUserProfileMapper(IDataReader reader, ref int startingIndex)
        {
            UserProfile profile = new UserProfile();
            profile.Id = reader.GetSafeInt32(startingIndex++);
            profile.UserId = reader.GetSafeInt32(startingIndex++);
            profile.FirstName = reader.GetSafeString(startingIndex++);
            profile.LastName = reader.GetSafeString(startingIndex++);
            profile.Mi = reader.GetSafeString(startingIndex++);
            profile.AvatarUrl = reader.GetSafeString(startingIndex++);
            profile.DateCreated = reader.GetSafeDateTime(startingIndex++);
            profile.DateModified = reader.GetSafeDateTime(startingIndex++);
            return profile;
        }

        private static void AddCommonParams(UserProfileAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@UserId", userId );
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@Mi", model.Mi);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
        }
    }
}
