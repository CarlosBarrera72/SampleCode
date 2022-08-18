using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class UserProfileAddRequest
    {

        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }
        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; }
        [StringLength(2, MinimumLength=0)]
        public string Mi { get; set; }
        [StringLength(128, MinimumLength = 2)]
        public string AvatarUrl { get; set; }

    }
}
