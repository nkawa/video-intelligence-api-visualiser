function draw_bounding_boxes(object_tracks, ctx) {
    ctx.clearRect(0, 0, 800, 500)

    const current_time = video.currentTime

    object_tracks.forEach(tracked_object => {

        if (tracked_object.has_frames_for_time(current_time)) {
            draw_bounding_box(tracked_object.current_bounding_box(current_time), tracked_object.name, ctx)
        }

    })
}

//   blue, orange, green, ...
var colors = ["#4285F4","#ff6600","#00cc66","#ff4dd2"]
var cnames = ["worker","handpallet", "pallet"]
const ctype = {
    "worker":"#4285F4",
    "handpallet":"#ff6600",
    "pallet": "#00cc66"
}

function draw_bounding_box(box, name = null, ctx) {

    ctx.strokeStyle = ctype[name]
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.rect(box.x, box.y, box.width, box.height)
    ctx.stroke()

    if (name) {
        ctx.fillStyle = ctype[name] //"#4285F4"
        ctx.fillRect(box.x, box.y, name.length * 13, 32)
        ctx.fillStyle = "#ffffff"
        ctx.fillText(name, box.x + 5, box.y + 22)
    }
}

function nullable_time_offset_to_seconds(time_offset) {
    if (!time_offset)
        return 0

    var seconds = parseFloat(time_offset)
//    var seconds = time_offset.seconds || 0
//    seconds += time_offset.nanos / 10e8 || 0
    return seconds
}

