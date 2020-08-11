using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }

        [JsonIgnore]
        public virtual Bonsai Bonsai { get; set; }
        public Guid BonsaiId { get; set; }

        [JsonIgnore]
        public virtual AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
    }
}