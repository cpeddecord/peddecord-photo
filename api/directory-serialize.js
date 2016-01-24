module.exports = function directorySerialize (dirTree, requestPath, done) {
  if (!dirTree.length)
    return done(null, []);

  const cerealizedDirTree = dirTree.map((directory, i, arr) => {
    const metadata = directory.children.find(child => child.meta);

    const thumbnailFromChildren = directory.children.find(child => child.thumbnail);
    const thumbnailImage = thumbnailFromChildren
      ? `${requestPath}/${directory.name}/${thumbnailFromChildren.thumbnail}`
      : '';

    return Object.assign({}, metadata.meta, {
      content: metadata.html || '',
      featuredImage: {
        url: thumbnailImage,
        dimensions: thumbnailFromChildren.dimensions || {},
        description: thumbnailFromChildren.exif.image.ImageDescription || ''
      },
      gallery: directory.children
        .filter(child => child.image)
        .map(child => {
          return {
            url: `${requestPath}/${directory.name}/${child.image}`,
            dimensions: child.dimensions || {},
            description: child.exif.image.ImageDescription || '',
          }
        })
    });
  });

  var sortedCereal = cerealizedDirTree.sort((left, right) => {
    if (left.priority && right.priority)
      return left.priority > right.priority;

    if (left.date && right.date)
      return new Date(left.date) < new Date(right.date);
  });

  done(null, sortedCereal);
}
