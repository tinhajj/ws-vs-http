(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/flatbuffers/js/constants.js
  var require_constants = __commonJS({
    "node_modules/flatbuffers/js/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SIZE_PREFIX_LENGTH = exports.FILE_IDENTIFIER_LENGTH = exports.SIZEOF_INT = exports.SIZEOF_SHORT = void 0;
      exports.SIZEOF_SHORT = 2;
      exports.SIZEOF_INT = 4;
      exports.FILE_IDENTIFIER_LENGTH = 4;
      exports.SIZE_PREFIX_LENGTH = 4;
    }
  });

  // node_modules/flatbuffers/js/utils.js
  var require_utils = __commonJS({
    "node_modules/flatbuffers/js/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isLittleEndian = exports.float64 = exports.float32 = exports.int32 = void 0;
      exports.int32 = new Int32Array(2);
      exports.float32 = new Float32Array(exports.int32.buffer);
      exports.float64 = new Float64Array(exports.int32.buffer);
      exports.isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
    }
  });

  // node_modules/flatbuffers/js/encoding.js
  var require_encoding = __commonJS({
    "node_modules/flatbuffers/js/encoding.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Encoding = void 0;
      var Encoding;
      (function(Encoding2) {
        Encoding2[Encoding2["UTF8_BYTES"] = 1] = "UTF8_BYTES";
        Encoding2[Encoding2["UTF16_STRING"] = 2] = "UTF16_STRING";
      })(Encoding = exports.Encoding || (exports.Encoding = {}));
    }
  });

  // node_modules/flatbuffers/js/byte-buffer.js
  var require_byte_buffer = __commonJS({
    "node_modules/flatbuffers/js/byte-buffer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ByteBuffer = void 0;
      var constants_js_1 = require_constants();
      var utils_js_1 = require_utils();
      var encoding_js_1 = require_encoding();
      var ByteBuffer = class {
        /**
         * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
         */
        constructor(bytes_) {
          this.bytes_ = bytes_;
          this.position_ = 0;
          this.text_decoder_ = new TextDecoder();
        }
        /**
         * Create and allocate a new ByteBuffer with a given size.
         */
        static allocate(byte_size) {
          return new ByteBuffer(new Uint8Array(byte_size));
        }
        clear() {
          this.position_ = 0;
        }
        /**
         * Get the underlying `Uint8Array`.
         */
        bytes() {
          return this.bytes_;
        }
        /**
         * Get the buffer's position.
         */
        position() {
          return this.position_;
        }
        /**
         * Set the buffer's position.
         */
        setPosition(position) {
          this.position_ = position;
        }
        /**
         * Get the buffer's capacity.
         */
        capacity() {
          return this.bytes_.length;
        }
        readInt8(offset) {
          return this.readUint8(offset) << 24 >> 24;
        }
        readUint8(offset) {
          return this.bytes_[offset];
        }
        readInt16(offset) {
          return this.readUint16(offset) << 16 >> 16;
        }
        readUint16(offset) {
          return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
        }
        readInt32(offset) {
          return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
        }
        readUint32(offset) {
          return this.readInt32(offset) >>> 0;
        }
        readInt64(offset) {
          return BigInt.asIntN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
        }
        readUint64(offset) {
          return BigInt.asUintN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
        }
        readFloat32(offset) {
          utils_js_1.int32[0] = this.readInt32(offset);
          return utils_js_1.float32[0];
        }
        readFloat64(offset) {
          utils_js_1.int32[utils_js_1.isLittleEndian ? 0 : 1] = this.readInt32(offset);
          utils_js_1.int32[utils_js_1.isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
          return utils_js_1.float64[0];
        }
        writeInt8(offset, value) {
          this.bytes_[offset] = value;
        }
        writeUint8(offset, value) {
          this.bytes_[offset] = value;
        }
        writeInt16(offset, value) {
          this.bytes_[offset] = value;
          this.bytes_[offset + 1] = value >> 8;
        }
        writeUint16(offset, value) {
          this.bytes_[offset] = value;
          this.bytes_[offset + 1] = value >> 8;
        }
        writeInt32(offset, value) {
          this.bytes_[offset] = value;
          this.bytes_[offset + 1] = value >> 8;
          this.bytes_[offset + 2] = value >> 16;
          this.bytes_[offset + 3] = value >> 24;
        }
        writeUint32(offset, value) {
          this.bytes_[offset] = value;
          this.bytes_[offset + 1] = value >> 8;
          this.bytes_[offset + 2] = value >> 16;
          this.bytes_[offset + 3] = value >> 24;
        }
        writeInt64(offset, value) {
          this.writeInt32(offset, Number(BigInt.asIntN(32, value)));
          this.writeInt32(offset + 4, Number(BigInt.asIntN(32, value >> BigInt(32))));
        }
        writeUint64(offset, value) {
          this.writeUint32(offset, Number(BigInt.asUintN(32, value)));
          this.writeUint32(offset + 4, Number(BigInt.asUintN(32, value >> BigInt(32))));
        }
        writeFloat32(offset, value) {
          utils_js_1.float32[0] = value;
          this.writeInt32(offset, utils_js_1.int32[0]);
        }
        writeFloat64(offset, value) {
          utils_js_1.float64[0] = value;
          this.writeInt32(offset, utils_js_1.int32[utils_js_1.isLittleEndian ? 0 : 1]);
          this.writeInt32(offset + 4, utils_js_1.int32[utils_js_1.isLittleEndian ? 1 : 0]);
        }
        /**
         * Return the file identifier.   Behavior is undefined for FlatBuffers whose
         * schema does not include a file_identifier (likely points at padding or the
         * start of a the root vtable).
         */
        getBufferIdentifier() {
          if (this.bytes_.length < this.position_ + constants_js_1.SIZEOF_INT + constants_js_1.FILE_IDENTIFIER_LENGTH) {
            throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
          }
          let result = "";
          for (let i = 0; i < constants_js_1.FILE_IDENTIFIER_LENGTH; i++) {
            result += String.fromCharCode(this.readInt8(this.position_ + constants_js_1.SIZEOF_INT + i));
          }
          return result;
        }
        /**
         * Look up a field in the vtable, return an offset into the object, or 0 if the
         * field is not present.
         */
        __offset(bb_pos, vtable_offset) {
          const vtable = bb_pos - this.readInt32(bb_pos);
          return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
        }
        /**
         * Initialize any Table-derived type to point to the union at the given offset.
         */
        __union(t, offset) {
          t.bb_pos = offset + this.readInt32(offset);
          t.bb = this;
          return t;
        }
        /**
         * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
         * This allocates a new string and converts to wide chars upon each access.
         *
         * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
         * "optionalEncoding" argument. This is useful for avoiding conversion when
         * the data will just be packaged back up in another FlatBuffer later on.
         *
         * @param offset
         * @param opt_encoding Defaults to UTF16_STRING
         */
        __string(offset, opt_encoding) {
          offset += this.readInt32(offset);
          const length = this.readInt32(offset);
          offset += constants_js_1.SIZEOF_INT;
          const utf8bytes = this.bytes_.subarray(offset, offset + length);
          if (opt_encoding === encoding_js_1.Encoding.UTF8_BYTES)
            return utf8bytes;
          else
            return this.text_decoder_.decode(utf8bytes);
        }
        /**
         * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
         * if a string then return a new one
         *
         * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
         * makes the behaviour of __union_with_string different compared to __union
         */
        __union_with_string(o, offset) {
          if (typeof o === "string") {
            return this.__string(offset);
          }
          return this.__union(o, offset);
        }
        /**
         * Retrieve the relative offset stored at "offset"
         */
        __indirect(offset) {
          return offset + this.readInt32(offset);
        }
        /**
         * Get the start of data of a vector whose offset is stored at "offset" in this object.
         */
        __vector(offset) {
          return offset + this.readInt32(offset) + constants_js_1.SIZEOF_INT;
        }
        /**
         * Get the length of a vector whose offset is stored at "offset" in this object.
         */
        __vector_len(offset) {
          return this.readInt32(offset + this.readInt32(offset));
        }
        __has_identifier(ident) {
          if (ident.length != constants_js_1.FILE_IDENTIFIER_LENGTH) {
            throw new Error("FlatBuffers: file identifier must be length " + constants_js_1.FILE_IDENTIFIER_LENGTH);
          }
          for (let i = 0; i < constants_js_1.FILE_IDENTIFIER_LENGTH; i++) {
            if (ident.charCodeAt(i) != this.readInt8(this.position() + constants_js_1.SIZEOF_INT + i)) {
              return false;
            }
          }
          return true;
        }
        /**
         * A helper function for generating list for obj api
         */
        createScalarList(listAccessor, listLength) {
          const ret = [];
          for (let i = 0; i < listLength; ++i) {
            const val = listAccessor(i);
            if (val !== null) {
              ret.push(val);
            }
          }
          return ret;
        }
        /**
         * A helper function for generating list for obj api
         * @param listAccessor function that accepts an index and return data at that index
         * @param listLength listLength
         * @param res result list
         */
        createObjList(listAccessor, listLength) {
          const ret = [];
          for (let i = 0; i < listLength; ++i) {
            const val = listAccessor(i);
            if (val !== null) {
              ret.push(val.unpack());
            }
          }
          return ret;
        }
      };
      exports.ByteBuffer = ByteBuffer;
    }
  });

  // node_modules/flatbuffers/js/builder.js
  var require_builder = __commonJS({
    "node_modules/flatbuffers/js/builder.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Builder = void 0;
      var byte_buffer_js_1 = require_byte_buffer();
      var constants_js_1 = require_constants();
      var Builder = class {
        /**
         * Create a FlatBufferBuilder.
         */
        constructor(opt_initial_size) {
          this.minalign = 1;
          this.vtable = null;
          this.vtable_in_use = 0;
          this.isNested = false;
          this.object_start = 0;
          this.vtables = [];
          this.vector_num_elems = 0;
          this.force_defaults = false;
          this.string_maps = null;
          this.text_encoder = new TextEncoder();
          let initial_size;
          if (!opt_initial_size) {
            initial_size = 1024;
          } else {
            initial_size = opt_initial_size;
          }
          this.bb = byte_buffer_js_1.ByteBuffer.allocate(initial_size);
          this.space = initial_size;
        }
        clear() {
          this.bb.clear();
          this.space = this.bb.capacity();
          this.minalign = 1;
          this.vtable = null;
          this.vtable_in_use = 0;
          this.isNested = false;
          this.object_start = 0;
          this.vtables = [];
          this.vector_num_elems = 0;
          this.force_defaults = false;
          this.string_maps = null;
        }
        /**
         * In order to save space, fields that are set to their default value
         * don't get serialized into the buffer. Forcing defaults provides a
         * way to manually disable this optimization.
         *
         * @param forceDefaults true always serializes default values
         */
        forceDefaults(forceDefaults) {
          this.force_defaults = forceDefaults;
        }
        /**
         * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
         * called finish(). The actual data starts at the ByteBuffer's current position,
         * not necessarily at 0.
         */
        dataBuffer() {
          return this.bb;
        }
        /**
         * Get the bytes representing the FlatBuffer. Only call this after you've
         * called finish().
         */
        asUint8Array() {
          return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
        }
        /**
         * Prepare to write an element of `size` after `additional_bytes` have been
         * written, e.g. if you write a string, you need to align such the int length
         * field is aligned to 4 bytes, and the string data follows it directly. If all
         * you need to do is alignment, `additional_bytes` will be 0.
         *
         * @param size This is the of the new element to write
         * @param additional_bytes The padding size
         */
        prep(size, additional_bytes) {
          if (size > this.minalign) {
            this.minalign = size;
          }
          const align_size = ~(this.bb.capacity() - this.space + additional_bytes) + 1 & size - 1;
          while (this.space < align_size + size + additional_bytes) {
            const old_buf_size = this.bb.capacity();
            this.bb = Builder.growByteBuffer(this.bb);
            this.space += this.bb.capacity() - old_buf_size;
          }
          this.pad(align_size);
        }
        pad(byte_size) {
          for (let i = 0; i < byte_size; i++) {
            this.bb.writeInt8(--this.space, 0);
          }
        }
        writeInt8(value) {
          this.bb.writeInt8(this.space -= 1, value);
        }
        writeInt16(value) {
          this.bb.writeInt16(this.space -= 2, value);
        }
        writeInt32(value) {
          this.bb.writeInt32(this.space -= 4, value);
        }
        writeInt64(value) {
          this.bb.writeInt64(this.space -= 8, value);
        }
        writeFloat32(value) {
          this.bb.writeFloat32(this.space -= 4, value);
        }
        writeFloat64(value) {
          this.bb.writeFloat64(this.space -= 8, value);
        }
        /**
         * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
         * @param value The `int8` to add the buffer.
         */
        addInt8(value) {
          this.prep(1, 0);
          this.writeInt8(value);
        }
        /**
         * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
         * @param value The `int16` to add the buffer.
         */
        addInt16(value) {
          this.prep(2, 0);
          this.writeInt16(value);
        }
        /**
         * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
         * @param value The `int32` to add the buffer.
         */
        addInt32(value) {
          this.prep(4, 0);
          this.writeInt32(value);
        }
        /**
         * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
         * @param value The `int64` to add the buffer.
         */
        addInt64(value) {
          this.prep(8, 0);
          this.writeInt64(value);
        }
        /**
         * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
         * @param value The `float32` to add the buffer.
         */
        addFloat32(value) {
          this.prep(4, 0);
          this.writeFloat32(value);
        }
        /**
         * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
         * @param value The `float64` to add the buffer.
         */
        addFloat64(value) {
          this.prep(8, 0);
          this.writeFloat64(value);
        }
        addFieldInt8(voffset, value, defaultValue) {
          if (this.force_defaults || value != defaultValue) {
            this.addInt8(value);
            this.slot(voffset);
          }
        }
        addFieldInt16(voffset, value, defaultValue) {
          if (this.force_defaults || value != defaultValue) {
            this.addInt16(value);
            this.slot(voffset);
          }
        }
        addFieldInt32(voffset, value, defaultValue) {
          if (this.force_defaults || value != defaultValue) {
            this.addInt32(value);
            this.slot(voffset);
          }
        }
        addFieldInt64(voffset, value, defaultValue) {
          if (this.force_defaults || value !== defaultValue) {
            this.addInt64(value);
            this.slot(voffset);
          }
        }
        addFieldFloat32(voffset, value, defaultValue) {
          if (this.force_defaults || value != defaultValue) {
            this.addFloat32(value);
            this.slot(voffset);
          }
        }
        addFieldFloat64(voffset, value, defaultValue) {
          if (this.force_defaults || value != defaultValue) {
            this.addFloat64(value);
            this.slot(voffset);
          }
        }
        addFieldOffset(voffset, value, defaultValue) {
          if (this.force_defaults || value != defaultValue) {
            this.addOffset(value);
            this.slot(voffset);
          }
        }
        /**
         * Structs are stored inline, so nothing additional is being added. `d` is always 0.
         */
        addFieldStruct(voffset, value, defaultValue) {
          if (value != defaultValue) {
            this.nested(value);
            this.slot(voffset);
          }
        }
        /**
         * Structures are always stored inline, they need to be created right
         * where they're used.  You'll get this assertion failure if you
         * created it elsewhere.
         */
        nested(obj) {
          if (obj != this.offset()) {
            throw new Error("FlatBuffers: struct must be serialized inline.");
          }
        }
        /**
         * Should not be creating any other object, string or vector
         * while an object is being constructed
         */
        notNested() {
          if (this.isNested) {
            throw new Error("FlatBuffers: object serialization must not be nested.");
          }
        }
        /**
         * Set the current vtable at `voffset` to the current location in the buffer.
         */
        slot(voffset) {
          if (this.vtable !== null)
            this.vtable[voffset] = this.offset();
        }
        /**
         * @returns Offset relative to the end of the buffer.
         */
        offset() {
          return this.bb.capacity() - this.space;
        }
        /**
         * Doubles the size of the backing ByteBuffer and copies the old data towards
         * the end of the new buffer (since we build the buffer backwards).
         *
         * @param bb The current buffer with the existing data
         * @returns A new byte buffer with the old data copied
         * to it. The data is located at the end of the buffer.
         *
         * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
         * it a uint8Array we need to suppress the type check:
         * @suppress {checkTypes}
         */
        static growByteBuffer(bb) {
          const old_buf_size = bb.capacity();
          if (old_buf_size & 3221225472) {
            throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
          }
          const new_buf_size = old_buf_size << 1;
          const nbb = byte_buffer_js_1.ByteBuffer.allocate(new_buf_size);
          nbb.setPosition(new_buf_size - old_buf_size);
          nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
          return nbb;
        }
        /**
         * Adds on offset, relative to where it will be written.
         *
         * @param offset The offset to add.
         */
        addOffset(offset) {
          this.prep(constants_js_1.SIZEOF_INT, 0);
          this.writeInt32(this.offset() - offset + constants_js_1.SIZEOF_INT);
        }
        /**
         * Start encoding a new object in the buffer.  Users will not usually need to
         * call this directly. The FlatBuffers compiler will generate helper methods
         * that call this method internally.
         */
        startObject(numfields) {
          this.notNested();
          if (this.vtable == null) {
            this.vtable = [];
          }
          this.vtable_in_use = numfields;
          for (let i = 0; i < numfields; i++) {
            this.vtable[i] = 0;
          }
          this.isNested = true;
          this.object_start = this.offset();
        }
        /**
         * Finish off writing the object that is under construction.
         *
         * @returns The offset to the object inside `dataBuffer`
         */
        endObject() {
          if (this.vtable == null || !this.isNested) {
            throw new Error("FlatBuffers: endObject called without startObject");
          }
          this.addInt32(0);
          const vtableloc = this.offset();
          let i = this.vtable_in_use - 1;
          for (; i >= 0 && this.vtable[i] == 0; i--) {
          }
          const trimmed_size = i + 1;
          for (; i >= 0; i--) {
            this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
          }
          const standard_fields = 2;
          this.addInt16(vtableloc - this.object_start);
          const len = (trimmed_size + standard_fields) * constants_js_1.SIZEOF_SHORT;
          this.addInt16(len);
          let existing_vtable = 0;
          const vt1 = this.space;
          outer_loop:
            for (i = 0; i < this.vtables.length; i++) {
              const vt2 = this.bb.capacity() - this.vtables[i];
              if (len == this.bb.readInt16(vt2)) {
                for (let j = constants_js_1.SIZEOF_SHORT; j < len; j += constants_js_1.SIZEOF_SHORT) {
                  if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
                    continue outer_loop;
                  }
                }
                existing_vtable = this.vtables[i];
                break;
              }
            }
          if (existing_vtable) {
            this.space = this.bb.capacity() - vtableloc;
            this.bb.writeInt32(this.space, existing_vtable - vtableloc);
          } else {
            this.vtables.push(this.offset());
            this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
          }
          this.isNested = false;
          return vtableloc;
        }
        /**
         * Finalize a buffer, poiting to the given `root_table`.
         */
        finish(root_table, opt_file_identifier, opt_size_prefix) {
          const size_prefix = opt_size_prefix ? constants_js_1.SIZE_PREFIX_LENGTH : 0;
          if (opt_file_identifier) {
            const file_identifier = opt_file_identifier;
            this.prep(this.minalign, constants_js_1.SIZEOF_INT + constants_js_1.FILE_IDENTIFIER_LENGTH + size_prefix);
            if (file_identifier.length != constants_js_1.FILE_IDENTIFIER_LENGTH) {
              throw new Error("FlatBuffers: file identifier must be length " + constants_js_1.FILE_IDENTIFIER_LENGTH);
            }
            for (let i = constants_js_1.FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
              this.writeInt8(file_identifier.charCodeAt(i));
            }
          }
          this.prep(this.minalign, constants_js_1.SIZEOF_INT + size_prefix);
          this.addOffset(root_table);
          if (size_prefix) {
            this.addInt32(this.bb.capacity() - this.space);
          }
          this.bb.setPosition(this.space);
        }
        /**
         * Finalize a size prefixed buffer, pointing to the given `root_table`.
         */
        finishSizePrefixed(root_table, opt_file_identifier) {
          this.finish(root_table, opt_file_identifier, true);
        }
        /**
         * This checks a required field has been set in a given table that has
         * just been constructed.
         */
        requiredField(table, field) {
          const table_start = this.bb.capacity() - table;
          const vtable_start = table_start - this.bb.readInt32(table_start);
          const ok = field < this.bb.readInt16(vtable_start) && this.bb.readInt16(vtable_start + field) != 0;
          if (!ok) {
            throw new Error("FlatBuffers: field " + field + " must be set");
          }
        }
        /**
         * Start a new array/vector of objects.  Users usually will not call
         * this directly. The FlatBuffers compiler will create a start/end
         * method for vector types in generated code.
         *
         * @param elem_size The size of each element in the array
         * @param num_elems The number of elements in the array
         * @param alignment The alignment of the array
         */
        startVector(elem_size, num_elems, alignment) {
          this.notNested();
          this.vector_num_elems = num_elems;
          this.prep(constants_js_1.SIZEOF_INT, elem_size * num_elems);
          this.prep(alignment, elem_size * num_elems);
        }
        /**
         * Finish off the creation of an array and all its elements. The array must be
         * created with `startVector`.
         *
         * @returns The offset at which the newly created array
         * starts.
         */
        endVector() {
          this.writeInt32(this.vector_num_elems);
          return this.offset();
        }
        /**
         * Encode the string `s` in the buffer using UTF-8. If the string passed has
         * already been seen, we return the offset of the already written string
         *
         * @param s The string to encode
         * @return The offset in the buffer where the encoded string starts
         */
        createSharedString(s) {
          if (!s) {
            return 0;
          }
          if (!this.string_maps) {
            this.string_maps = /* @__PURE__ */ new Map();
          }
          if (this.string_maps.has(s)) {
            return this.string_maps.get(s);
          }
          const offset = this.createString(s);
          this.string_maps.set(s, offset);
          return offset;
        }
        /**
         * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
         * instead of a string, it is assumed to contain valid UTF-8 encoded data.
         *
         * @param s The string to encode
         * @return The offset in the buffer where the encoded string starts
         */
        createString(s) {
          if (s === null || s === void 0) {
            return 0;
          }
          let utf8;
          if (s instanceof Uint8Array) {
            utf8 = s;
          } else {
            utf8 = this.text_encoder.encode(s);
          }
          this.addInt8(0);
          this.startVector(1, utf8.length, 1);
          this.bb.setPosition(this.space -= utf8.length);
          for (let i = 0, offset = this.space, bytes = this.bb.bytes(); i < utf8.length; i++) {
            bytes[offset++] = utf8[i];
          }
          return this.endVector();
        }
        /**
         * A helper function to pack an object
         *
         * @returns offset of obj
         */
        createObjectOffset(obj) {
          if (obj === null) {
            return 0;
          }
          if (typeof obj === "string") {
            return this.createString(obj);
          } else {
            return obj.pack(this);
          }
        }
        /**
         * A helper function to pack a list of object
         *
         * @returns list of offsets of each non null object
         */
        createObjectOffsetList(list) {
          const ret = [];
          for (let i = 0; i < list.length; ++i) {
            const val = list[i];
            if (val !== null) {
              ret.push(this.createObjectOffset(val));
            } else {
              throw new Error("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
            }
          }
          return ret;
        }
        createStructOffsetList(list, startFunc) {
          startFunc(this, list.length);
          this.createObjectOffsetList(list.slice().reverse());
          return this.endVector();
        }
      };
      exports.Builder = Builder;
    }
  });

  // node_modules/flatbuffers/js/flatbuffers.js
  var require_flatbuffers = __commonJS({
    "node_modules/flatbuffers/js/flatbuffers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ByteBuffer = exports.Builder = exports.Encoding = exports.isLittleEndian = exports.float64 = exports.float32 = exports.int32 = exports.SIZE_PREFIX_LENGTH = exports.FILE_IDENTIFIER_LENGTH = exports.SIZEOF_INT = exports.SIZEOF_SHORT = void 0;
      var constants_js_1 = require_constants();
      Object.defineProperty(exports, "SIZEOF_SHORT", { enumerable: true, get: function() {
        return constants_js_1.SIZEOF_SHORT;
      } });
      var constants_js_2 = require_constants();
      Object.defineProperty(exports, "SIZEOF_INT", { enumerable: true, get: function() {
        return constants_js_2.SIZEOF_INT;
      } });
      var constants_js_3 = require_constants();
      Object.defineProperty(exports, "FILE_IDENTIFIER_LENGTH", { enumerable: true, get: function() {
        return constants_js_3.FILE_IDENTIFIER_LENGTH;
      } });
      var constants_js_4 = require_constants();
      Object.defineProperty(exports, "SIZE_PREFIX_LENGTH", { enumerable: true, get: function() {
        return constants_js_4.SIZE_PREFIX_LENGTH;
      } });
      var utils_js_1 = require_utils();
      Object.defineProperty(exports, "int32", { enumerable: true, get: function() {
        return utils_js_1.int32;
      } });
      Object.defineProperty(exports, "float32", { enumerable: true, get: function() {
        return utils_js_1.float32;
      } });
      Object.defineProperty(exports, "float64", { enumerable: true, get: function() {
        return utils_js_1.float64;
      } });
      Object.defineProperty(exports, "isLittleEndian", { enumerable: true, get: function() {
        return utils_js_1.isLittleEndian;
      } });
      var encoding_js_1 = require_encoding();
      Object.defineProperty(exports, "Encoding", { enumerable: true, get: function() {
        return encoding_js_1.Encoding;
      } });
      var builder_js_1 = require_builder();
      Object.defineProperty(exports, "Builder", { enumerable: true, get: function() {
        return builder_js_1.Builder;
      } });
      var byte_buffer_js_1 = require_byte_buffer();
      Object.defineProperty(exports, "ByteBuffer", { enumerable: true, get: function() {
        return byte_buffer_js_1.ByteBuffer;
      } });
    }
  });

  // src/fb.ts
  var flatbuffers2 = __toESM(require_flatbuffers());

  // src/block.ts
  var block_exports = {};
  __export(block_exports, {
    Block: () => Block
  });

  // src/block/block.ts
  var flatbuffers = __toESM(require_flatbuffers());
  var Block = class {
    constructor() {
      this.bb = null;
      this.bb_pos = 0;
    }
    __init(i, bb) {
      this.bb_pos = i;
      this.bb = bb;
      return this;
    }
    static getRootAsBlock(bb, obj) {
      return (obj || new Block()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsBlock(bb, obj) {
      bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
      return (obj || new Block()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    id() {
      const offset = this.bb.__offset(this.bb_pos, 4);
      return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    }
    names(index, optionalEncoding) {
      const offset = this.bb.__offset(this.bb_pos, 6);
      return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    }
    namesLength() {
      const offset = this.bb.__offset(this.bb_pos, 6);
      return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    }
    static startBlock(builder) {
      builder.startObject(2);
    }
    static addId(builder, id) {
      builder.addFieldInt32(0, id, 0);
    }
    static addNames(builder, namesOffset) {
      builder.addFieldOffset(1, namesOffset, 0);
    }
    static createNamesVector(builder, data) {
      builder.startVector(4, data.length, 4);
      for (let i = data.length - 1; i >= 0; i--) {
        builder.addOffset(data[i]);
      }
      return builder.endVector();
    }
    static startNamesVector(builder, numElems) {
      builder.startVector(4, numElems, 4);
    }
    static endBlock(builder) {
      const offset = builder.endObject();
      return offset;
    }
    static createBlock(builder, id, namesOffset) {
      Block.startBlock(builder);
      Block.addId(builder, id);
      Block.addNames(builder, namesOffset);
      return Block.endBlock(builder);
    }
  };

  // src/fb.ts
  document.flatbuffers = flatbuffers2;
  document.block = block_exports;
})();
